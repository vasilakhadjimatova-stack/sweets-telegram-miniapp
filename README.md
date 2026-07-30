# Sweet Shop Telegram Mini App
Modern online sweets and desserts store for Telegram group.

## Backend Database (SQLite)

The bot persists data in a local SQLite database (via `better-sqlite3`):

- **users** — customers who started the bot or placed an order
- **orders** — orders received from the Mini App, with live status (`new` → `confirmed` → `delivered` / `cancelled`)
- **order_items** — items of each order

The database file is created automatically at `data/sweets.db` on first run.
You can override the location with `DATABASE_PATH` in `.env`.

Admin commands:
- `/stats` — shop statistics (orders, revenue, customers). Works only in the admin group when `ADMIN_GROUP_ID` is set.

## Setup

```bash
npm install
cp .env.example .env   # fill in TELEGRAM_BOT_TOKEN, WEB_APP_URL, ADMIN_GROUP_ID
npm start
```
