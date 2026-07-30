// SQLite database layer for the Sweets Shop bot.
// Uses better-sqlite3 (synchronous, zero-config, file-based).
// The database file is created automatically on first run.

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// Database file location (override with DATABASE_PATH in .env)
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'data', 'sweets.db');

// Make sure the data/ directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    telegram_id  INTEGER PRIMARY KEY,
    first_name   TEXT,
    last_name    TEXT,
    username     TEXT,
    created_at   TEXT NOT NULL DEFAULT (datetime('now')),
    last_seen_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code     TEXT NOT NULL,              -- 4-digit ID shown to the customer (#1024)
    telegram_id    INTEGER,
    customer_name  TEXT,
    phone          TEXT,
    address        TEXT,
    delivery_type  TEXT,
    payment_method TEXT,
    comment        TEXT,
    subtotal       INTEGER NOT NULL DEFAULT 0, -- amounts are stored in UZS
    delivery       INTEGER NOT NULL DEFAULT 0,
    discount       INTEGER NOT NULL DEFAULT 0,
    total          INTEGER NOT NULL DEFAULT 0,
    status         TEXT NOT NULL DEFAULT 'new', -- new | confirmed | delivered | cancelled
    created_at     TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at     TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (telegram_id) REFERENCES users(telegram_id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    title    TEXT NOT NULL,
    price    INTEGER NOT NULL,
    qty      INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders(status);
  CREATE INDEX IF NOT EXISTS idx_orders_telegram_id ON orders(telegram_id);
  CREATE INDEX IF NOT EXISTS idx_orders_order_code  ON orders(order_code);
  CREATE INDEX IF NOT EXISTS idx_order_items_order  ON order_items(order_id);
`);

// ---------------------------------------------------------------------------
// Prepared statements
// ---------------------------------------------------------------------------
const upsertUserStmt = db.prepare(`
  INSERT INTO users (telegram_id, first_name, last_name, username)
  VALUES (@telegram_id, @first_name, @last_name, @username)
  ON CONFLICT(telegram_id) DO UPDATE SET
    first_name   = excluded.first_name,
    last_name    = excluded.last_name,
    username     = excluded.username,
    last_seen_at = datetime('now')
`);

const insertOrderStmt = db.prepare(`
  INSERT INTO orders (
    order_code, telegram_id, customer_name, phone, address,
    delivery_type, payment_method, comment,
    subtotal, delivery, discount, total
  ) VALUES (
    @order_code, @telegram_id, @customer_name, @phone, @address,
    @delivery_type, @payment_method, @comment,
    @subtotal, @delivery, @discount, @total
  )
`);

const insertOrderItemStmt = db.prepare(`
  INSERT INTO order_items (order_id, title, price, qty)
  VALUES (@order_id, @title, @price, @qty)
`);

const updateStatusStmt = db.prepare(`
  UPDATE orders
  SET status = @status, updated_at = datetime('now')
  WHERE id = (
    SELECT id FROM orders
    WHERE order_code = @order_code
    ORDER BY id DESC
    LIMIT 1
  )
`);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Save or refresh a Telegram user (called on /start and on every order). */
function upsertUser(tgUser) {
  if (!tgUser || !tgUser.id) return;
  upsertUserStmt.run({
    telegram_id: tgUser.id,
    first_name: tgUser.first_name || null,
    last_name: tgUser.last_name || null,
    username: tgUser.username || null
  });
}

/**
 * Persist an order coming from the Mini App (tg.sendData payload).
 * Returns the internal numeric order id.
 */
const createOrder = db.transaction((order, tgUser) => {
  if (tgUser) upsertUser(tgUser);

  const result = insertOrderStmt.run({
    order_code: String(order.orderId),
    telegram_id: tgUser ? tgUser.id : null,
    customer_name: order.name || null,
    phone: order.phone || null,
    address: order.address || null,
    delivery_type: order.deliveryType || null,
    payment_method: order.paymentMethod || null,
    comment: order.comment || null,
    subtotal: order.pricing ? order.pricing.subtotal || 0 : 0,
    delivery: order.pricing ? order.pricing.delivery || 0 : 0,
    discount: order.pricing ? order.pricing.discount || 0 : 0,
    total: order.pricing ? order.pricing.total || 0 : 0
  });

  const orderId = result.lastInsertRowid;

  (order.items || []).forEach((item) => {
    insertOrderItemStmt.run({
      order_id: orderId,
      title: item.title,
      price: item.price || 0,
      qty: item.qty || 1
    });
  });

  return orderId;
});

/**
 * Update the status of the most recent order with the given customer-facing code.
 * status: 'confirmed' | 'delivered' | 'cancelled'
 * Returns true if an order was updated.
 */
function updateOrderStatusByCode(orderCode, status) {
  const info = updateStatusStmt.run({ order_code: String(orderCode), status });
  return info.changes > 0;
}

/** Latest orders together with their items (for /stats and future admin views). */
function listRecentOrders(limit = 10) {
  const orders = db.prepare(`
    SELECT * FROM orders ORDER BY id DESC LIMIT ?
  `).all(limit);

  const itemsStmt = db.prepare(`SELECT title, price, qty FROM order_items WHERE order_id = ?`);
  return orders.map((o) => ({ ...o, items: itemsStmt.all(o.id) }));
}

/** Aggregate shop statistics (used by the /stats admin command). */
function getStats() {
  const totals = db.prepare(`
    SELECT
      COUNT(*)                                                    AS total_orders,
      COALESCE(SUM(CASE WHEN status != 'cancelled' THEN total END), 0) AS revenue,
      SUM(CASE WHEN status = 'new'       THEN 1 ELSE 0 END)       AS new_count,
      SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END)       AS confirmed_count,
      SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END)       AS delivered_count,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)       AS cancelled_count
    FROM orders
  `).get();

  const today = db.prepare(`
    SELECT
      COUNT(*) AS orders_today,
      COALESCE(SUM(CASE WHEN status != 'cancelled' THEN total END), 0) AS revenue_today
    FROM orders
    WHERE date(created_at) = date('now')
  `).get();

  const users = db.prepare(`SELECT COUNT(*) AS total_users FROM users`).get();

  return { ...totals, ...today, ...users };
}

module.exports = {
  db,
  dbPath,
  upsertUser,
  createOrder,
  updateOrderStatusByCode,
  listRecentOrders,
  getStats
};
