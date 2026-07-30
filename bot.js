require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Retrieve environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL || 'https://vasilakhadjimatova-stack.github.io/sweets-telegram-miniapp/';
const adminGroupId = process.env.ADMIN_GROUP_ID;

if (!token) {
  console.error("Xatolik: TELEGRAM_BOT_TOKEN .env faylida ko'rsatilmagan!");
  process.exit(1);
}

// Create the bot
const bot = new TelegramBot(token, { polling: true });

console.log('Telegram shirinliklar boti ishga tushdi...');

bot.on('polling_error', (err) => {
  console.error('Polling xatosi:', err.code || '', err.message || err);
});

// Escape user-supplied text before embedding it into Markdown-parsed messages.
// Without this, a name/comment containing a lone *, _, [ or ` makes Telegram
// reject the whole message (400: can't parse entities) and the receipt is lost.
function escapeMd(value) {
  return String(value ?? '').replace(/([_*\[\]`])/g, '\\$1');
}

// sendMessage with Markdown that falls back to plain text if parsing still fails,
// so an order notification is never silently dropped.
function sendMarkdownSafe(chatId, text, options = {}) {
  return bot.sendMessage(chatId, text, { parse_mode: 'Markdown', ...options })
    .catch((err) => {
      console.error('Markdown yuborishda xato, oddiy matnga o\'tilyapti:', err.message || err);
      // Retry as plain text (unescape our backslashes) so the message still arrives
      return bot.sendMessage(chatId, text.replace(/\\([_*\[\]`])/g, '$1'), options)
        .catch((err2) => console.error('Xabar yuborib bo\'lmadi:', err2.message || err2));
    });
}

// Respond to /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = escapeMd(msg.from.first_name || 'Mijoz');

  const welcomeMessage = `*Assalomu alaykum, ${firstName}!* 🍰✨\n\n` +
    `*Medovik.uz* premium shirinliklar do'konining Telegram botiga xush kelibsiz!\n\n` +
    `Bizda eng shirin va sifatli tortlar, fransuzcha makaronlar, donatlar hamda kapkeklarni buyurtma qilishingiz mumkin.\n\n` +
    `Pastdagi *🛍 Do'konni ochish* tugmasini bosing va shirinliklar dunyosiga sayohat qiling!`;

  // Reply keyboard button that opens the Web App.
  // IMPORTANT: tg.sendData() (used by the Mini App to submit orders) ONLY works
  // when the Web App is opened from a reply-keyboard button, NOT an inline button.
  const replyKeyboard = {
    keyboard: [
      [
        {
          text: "🛍 Do'konni ochish",
          web_app: { url: webAppUrl }
        }
      ],
      [
        { text: '📞 Aloqa / Yordam' }
      ]
    ],
    resize_keyboard: true,
    is_persistent: true
  };

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: replyKeyboard
  }).catch((err) => {
    console.error('/start javobini yuborishda xato:', err.message || err);
    // Fallback: plain text so the user still gets the shop button
    bot.sendMessage(chatId, 'Assalomu alaykum! Do\'konni ochish uchun pastdagi tugmani bosing.', {
      reply_markup: replyKeyboard
    }).catch((err2) => console.error('/start fallback ham yuborilmadi:', err2.message || err2));
  });
});

// Handle the "Aloqa / Yordam" reply-keyboard button (plain text message)
bot.onText(/📞 Aloqa \/ Yordam/, (msg) => {
  const chatId = msg.chat.id;
  const supportMessage = `*📞 Biz bilan bog'lanish:*\n\n` +
    `Telegram: @impulse_sweets_admin\n` +
    `Telefon: +998 90 123 45 67\n` +
    `Ish vaqti: Har kuni, 09:00 dan 22:00 gacha\n\n` +
    `Agar sizda maxsus buyurtmalar yoki savollar bo'lsa, bemalol murojaat qiling.`;

  sendMarkdownSafe(chatId, supportMessage);
});

// Handle Callback Queries (Admin order action button presses)
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data || '';

  // Admin order action handling
  if (data.startsWith('confirm_') || data.startsWith('deliver_') || data.startsWith('cancel_')) {
    const action = data.split('_')[0];
    const orderId = data.split('_')[1];
    const operator = query.from.username ? `@${query.from.username}` : (query.from.first_name || 'Admin');

    let originalText = query.message.text || query.message.caption || "";
    let statusText = "";
    let newKeyboard = null;

    if (action === 'confirm') {
      statusText = `\n\n⚙️ Holati: QABUL QILINDI (Operator: ${operator})`;
      newKeyboard = {
        inline_keyboard: [
          [
            { text: "🚚 Yo'lga chiqdi / Yetkazildi", callback_data: `deliver_${orderId}` },
            { text: '❌ Bekor qilish', callback_data: `cancel_${orderId}` }
          ]
        ]
      };
    } else if (action === 'deliver') {
      statusText = `\n\n✅ Holati: YETKAZIB BERILDI (Bajarildi: ${operator})`;
    } else if (action === 'cancel') {
      statusText = `\n\n❌ Holati: BEKOR QILINDI (Bekor qildi: ${operator})`;
    }

    // Remove old state markers if any
    let cleanedText = originalText
      .replace(/\n\n⚙️ Holati:[\s\S]*$/, "")
      .replace(/\n\n✅ Holati:[\s\S]*$/, "")
      .replace(/\n\n❌ Holati:[\s\S]*$/, "");

    // NOTE: query.message.text is entity-stripped plain text, so we edit WITHOUT
    // parse_mode — re-parsing as Markdown could fail on user-supplied characters.
    bot.editMessageText(cleanedText + statusText, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: newKeyboard
    }).catch((err) => {
      // "message is not modified" on double-taps is expected — log the rest
      if (!String(err.message || err).includes('message is not modified')) {
        console.error('Status xabarini tahrirlashda xato:', err.message || err);
      }
    });

    bot.answerCallbackQuery(query.id, { text: `Buyurtma statusi o'zgardi: ${action.toUpperCase()}` })
      .catch((err) => console.error('answerCallbackQuery xatosi:', err.message || err));
  } else {
    // Unknown/stale button — answer anyway so Telegram stops the loading spinner
    bot.answerCallbackQuery(query.id).catch(() => {});
  }
});

// Handle Data Received from the Web App (tg.sendData)
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  
  try {
    const order = JSON.parse(msg.web_app_data.data);

    // 1. Generate Order Summary text (user-supplied values are Markdown-escaped)
    let itemsText = '';
    order.items.forEach((item, index) => {
      itemsText += `${index + 1}. *${escapeMd(item.title)}* - ${item.qty} dona x ${item.price.toLocaleString('uz-UZ')} UZS\n`;
    });

    const formatUZS = (num) => num.toLocaleString('uz-UZ') + " UZS";

    const receiptMessage = `*🎉 Buyurtmangiz qabul qilindi!* (ID: #${order.orderId})\n\n` +
      `*Hurmatli ${escapeMd(order.name)},* sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Operatorlarimiz tez orada siz bilan bog'lanishadi.\n\n` +
      `*Buyurtma tarkibi:*\n${itemsText}\n` +
      `*Moliyaviy hisobot:*\n` +
      `• Subtotal: ${formatUZS(order.pricing.subtotal)}\n` +
      `• Yetkazib berish: ${formatUZS(order.pricing.delivery)}\n` +
      (order.pricing.discount > 0 ? `• Chegirma: -${formatUZS(order.pricing.discount)}\n` : '') +
      `• *Jami summa: ${formatUZS(order.pricing.total)}*\n\n` +
      `*Yetkazib berish ma'lumotlari:*\n` +
      `• Yetkazib berish turi: ${order.deliveryType}\n` +
      `• Manzil: ${escapeMd(order.address)}\n` +
      `• Telefon raqam: ${escapeMd(order.phone)}\n` +
      `• To'lov turi: ${order.paymentMethod}\n` +
      `• Izoh: ${escapeMd(order.comment)}\n\n` +
      `Shirinliklarimizni tanlaganingiz uchun rahmat! 🍰💖`;

    // 2. Send receipt back to the user
    sendMarkdownSafe(chatId, receiptMessage);

    // 3. If Admin Group ID is set, send a notification to the Admin group/channel
    if (adminGroupId) {
      const adminMessage = `*🆕 YANGI BUYURTMA (ID: #${order.orderId})*\n` +
        `👤 *Mijoz:* ${escapeMd(order.name)} (${user.username ? '@' + escapeMd(user.username) : "username yo'q"})\n` +
        `📞 *Tel:* ${escapeMd(order.phone)}\n` +
        `📍 *Manzil:* ${escapeMd(order.address)}\n` +
        `📦 *Turi:* ${order.deliveryType}\n` +
        `💳 *To'lov:* ${order.paymentMethod}\n` +
        `💬 *Izoh:* ${escapeMd(order.comment)}\n\n` +
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

      sendMarkdownSafe(adminGroupId, adminMessage, { reply_markup: adminKeyboard });
    }

  } catch (err) {
    console.error('Xabar ma\'lumotlarini o\'qishda xatolik:', err);
    bot.sendMessage(chatId, 'Kechirasiz, buyurtma ma\'lumotlarini qayta ishlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.')
      .catch((err2) => console.error('Xato xabarini yuborib bo\'lmadi:', err2.message || err2));
  }
});
