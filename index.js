const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('1567243704:AAG4i5Mu2Ki-pVfvkfA1x4fqMJr0v3F0B1k', { polling: true });
const hours = {
	'3_hours': '3 часа',
	'2_5_hours': '2.5 часа',
	'2_hours': '2 часа',
};
const keyboard = [
  [
    {
      text: 'Напомнить через 3 часа',
      callback_data: '3_hours'
    }
  ],
  [
    {
      text: 'Напомнить через 2.5 часа',
      callback_data: '2_5_hours'
    }
  ],
  [
    {
      text: 'Напомнить через 2 часа',
      callback_data: '2_hours'
    }
  ]
];

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
	
	bot.sendMessage(chatId, 'Привет! Готовы кормить по расписанию?', {
		reply_markup: {
			inline_keyboard: keyboard
		}
	});

});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

	console.warn(query.data)
	if (query.data) {
		bot.sendMessage(chatId, `OK, напомню через ${hours[query.data]}.`);
	}
});