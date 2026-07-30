require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const db = require('./db');

// Retrieve environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL || 'https://your-github-pages-or-hosting.com';
const adminGroupId = process.env.ADMIN_GROUP_ID;

if (!token) {
  console.error("Xatolik: TELEGRAM_BOT_TOKEN .env faylida ko'rsatilmagan!");
  process.exit(1);
}

// Create the bot
const bot = new TelegramBot(token, { polling: true });

console.log('Telegram shirinliklar boti ishga tushdi...');
console.log(`Ma'lumotlar bazasi: ${db.dbPath}`);

// Respond to /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'Mijoz';

  // Register/update the user in the database
  try {
    db.upsertUser(msg.from);
  } catch (err) {
    console.error("Foydalanuvchini bazaga saqlashda xatolik:", err);
  }

  const welcomeMessage = `*Assalomu alaykum, ${firstName}!* 🍰✨\n\n` +
    `*Impulse Sweets* premium shirinliklar do'konining Telegram botiga xush kelibsiz!\n\n` +
    `Bizda eng shirin va sifatli tortlar, fransuzcha makaronlar, donatlar hamda kapkeklarni buyurtma qilishingiz mumkin.\n\n` +
    `Pastdagi *🛍 Do'konni ochish* tugmasini bosing va shirinliklar dunyosiga sayohat qiling!`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        {
          text: "🛍 Do'konni ochish",
          web_app: { url: webAppUrl }
        }
      ],
      [
        {
          text: "💬 Guruhimizga qo'shilish",
          url: 'https://t.me/your_sweets_group' // Replace with user's actual group link
        },
        {
          text: '📞 Aloqa / Yordam',
          callback_data: 'support_info'
        }
      ]
    ]
  };

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: inlineKeyboard
  });
});

// Handle Callback Queries (Support info & Admin button presses)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  if (data === 'support_info') {
    const supportMessage = `*📞 Biz bilan bog'lanish:*\n\n` +
      `Telegram: @impulse_sweets_admin\n` +
      `Telefon: +998 90 123 45 67\n` +
      `Ish vaqti: Har kuni, 09:00 dan 22:00 gacha\n\n` +
      `Agar sizda maxsus buyurtmalar yoki savollar bo'lsa, bemalol murojaat qiling.`;

    bot.sendMessage(chatId, supportMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '◀️ Orqaga', callback_data: 'back_to_menu' }]
        ]
      }
    });
  } 
  
  else if (data === 'back_to_menu') {
    // Edit the message back to initial welcome or just notify them to type /start
    bot.sendMessage(chatId, "Asosiy menyuga qaytish uchun /start buyrug'ini bosing.");
  }
  
  // Admin order action handling
  else if (data.startsWith('confirm_') || data.startsWith('deliver_') || data.startsWith('cancel_')) {
    const action = data.split('_')[0];
    const orderId = data.split('_')[1];
    const operator = query.from.username ? `@${query.from.username}` : (query.from.first_name || 'Admin');
    
    let originalText = query.message.text || query.message.caption || "";
    let statusText = "";
    let newKeyboard = null;

    // Persist the status change in the database
    const statusMap = { confirm: 'confirmed', deliver: 'delivered', cancel: 'cancelled' };
    try {
      db.updateOrderStatusByCode(orderId, statusMap[action]);
    } catch (err) {
      console.error('Buyurtma statusini bazada yangilashda xatolik:', err);
    }

    if (action === 'confirm') {
      statusText = `\n\n⚙️ *Holati:* QABUL QILINDI (Operator: ${operator})`;
      newKeyboard = {
        inline_keyboard: [
          [
            { text: "🚚 Yo'lga chiqdi / Yetkazildi", callback_data: `deliver_${orderId}` },
            { text: '❌ Bekor qilish', callback_data: `cancel_${orderId}` }
          ]
        ]
      };
    } else if (action === 'deliver') {
      statusText = `\n\n✅ *Holati:* YETKAZIB BERILDI (Bajarildi: ${operator})`;
    } else if (action === 'cancel') {
      statusText = `\n\n❌ *Holati:* BEKOR QILINDI (Bekor qildi: ${operator})`;
    }

    // Remove old state markers if any
    let cleanedText = originalText
      .replace(/\n\n⚙️ Holati:[\s\S]*$/, "")
      .replace(/\n\n✅ Holati:[\s\S]*$/, "")
      .replace(/\n\n❌ Holati:[\s\S]*$/, "");

    bot.editMessageText(cleanedText + statusText, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: newKeyboard
    });

    bot.answerCallbackQuery(query.id, { text: `Buyurtma statusi o'zgardi: ${action.toUpperCase()}` });
  }
});

// /stats — shop statistics from the database (admins only).
// If ADMIN_GROUP_ID is set, the command only works in that chat.
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;

  if (adminGroupId && String(chatId) !== String(adminGroupId)) {
    return; // Ignore /stats outside the admin group
  }

  try {
    const s = db.getStats();
    const fmt = (n) => (n || 0).toLocaleString('uz-UZ');

    const statsMessage = `*📊 Do'kon statistikasi*\n\n` +
      `👥 Mijozlar: *${fmt(s.total_users)}*\n` +
      `🧾 Jami buyurtmalar: *${fmt(s.total_orders)}*\n` +
      `💰 Jami tushum: *${fmt(s.revenue)} UZS*\n\n` +
      `*Bugun:*\n` +
      `• Buyurtmalar: ${fmt(s.orders_today)}\n` +
      `• Tushum: ${fmt(s.revenue_today)} UZS\n\n` +
      `*Holatlar bo'yicha:*\n` +
      `🆕 Yangi: ${fmt(s.new_count)}\n` +
      `⚙️ Qabul qilingan: ${fmt(s.confirmed_count)}\n` +
      `✅ Yetkazilgan: ${fmt(s.delivered_count)}\n` +
      `❌ Bekor qilingan: ${fmt(s.cancelled_count)}`;

    bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Statistikani olishda xatolik:', err);
    bot.sendMessage(chatId, 'Statistikani olishda xatolik yuz berdi.');
  }
});

// Handle Data Received from the Web App (tg.sendData)
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  
  try {
    const order = JSON.parse(msg.web_app_data.data);

    // 0. Persist the order (and the customer) in the database
    try {
      const internalId = db.createOrder(order, user);
      console.log(`Buyurtma bazaga saqlandi: #${order.orderId} (ichki ID: ${internalId})`);
    } catch (err) {
      console.error('Buyurtmani bazaga saqlashda xatolik:', err);
    }

    // 1. Generate Order Summary text
    let itemsText = '';
    order.items.forEach((item, index) => {
      itemsText += `${index + 1}. *${item.title}* - ${item.qty} dona x ${item.price.toLocaleString('uz-UZ')} UZS\n`;
    });

    const formatUZS = (num) => num.toLocaleString('uz-UZ') + " UZS";

    const receiptMessage = `*🎉 Buyurtmangiz qabul qilindi!* (ID: #${order.orderId})\n\n` +
      `*Hurmatli ${order.name},* sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Operatorlarimiz tez orada siz bilan bog'lanishadi.\n\n` +
      `*Buyurtma tarkibi:*\n${itemsText}\n` +
      `*Moliyaviy hisobot:*\n` +
      `• Subtotal: ${formatUZS(order.pricing.subtotal)}\n` +
      `• Yetkazib berish: ${formatUZS(order.pricing.delivery)}\n` +
      (order.pricing.discount > 0 ? `• Chegirma: -${formatUZS(order.pricing.discount)}\n` : '') +
      `• *Jami summa: ${formatUZS(order.pricing.total)}*\n\n` +
      `*Yetkazib berish ma'lumotlari:*\n` +
      `• Yetkazib berish turi: ${order.deliveryType}\n` +
      `• Manzil: ${order.address}\n` +
      `• Telefon raqam: ${order.phone}\n` +
      `• To'lov turi: ${order.paymentMethod}\n` +
      `• Izoh: ${order.comment}\n\n` +
      `Shirinliklarimizni tanlaganingiz uchun rahmat! 🍰💖`;

    // 2. Send receipt back to the user
    bot.sendMessage(chatId, receiptMessage, { parse_mode: 'Markdown' });

    // 3. If Admin Group ID is set, send a notification to the Admin group/channel
    if (adminGroupId) {
      const adminMessage = `*🆕 YANGI BUYURTMA (ID: #${order.orderId})*\n` +
        `👤 *Mijoz:* ${order.name} (${user.username ? '@' + user.username : "username yo'q"})\n` +
        `📞 *Tel:* ${order.phone}\n` +
        `📍 *Manzil:* ${order.address}\n` +
        `📦 *Turi:* ${order.deliveryType}\n` +
        `💳 *To'lov:* ${order.paymentMethod}\n` +
        `💬 *Izoh:* ${order.comment}\n\n` +
        `*Savat tarkibi:*\n${itemsText}\n` +
        `*Jami summa: ${formatUZS(order.pricing.total)}*`;

      const adminKeyboard = {
        inline_keyboard: [
          [
            { text: '👍 Qabul qilish', callback_data: `confirm_${order.orderId}` },
            { text: '❌ Bekor qilish', callback_data: `cancel_${order.orderId}` }
          ]
        ]
      };

      bot.sendMessage(adminGroupId, adminMessage, {
        parse_mode: 'Markdown',
        reply_markup: adminKeyboard
      });
    }

  } catch (err) {
    console.error('Xabar ma\'lumotlarini o\'qishda xatolik:', err);
    bot.sendMessage(chatId, 'Kechirasiz, buyurtma ma\'lumotlarini qayta ishlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
  }
});
