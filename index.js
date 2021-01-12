const TelegramBot = require('node-telegram-bot-api');
const CronJob = require('cron').CronJob;

const bot = new TelegramBot('1567243704:AAG4i5Mu2Ki-pVfvkfA1x4fqMJr0v3F0B1k', { polling: true });


const hours = [
	['1 минуту', 1],
	['3 часа', 180],
	['2.5 часа', 150],
	['2 часа', 120],
	['1.5 часа', 90],
];

const keyboard = hours.map(item => ([{ text: `Напомнить через ${item[0]}.`, callback_data: `${item[1]}` }]));

console.log(keyboard)
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
	if (query.data) {
		setTimeout(() => {
			bot.sendMessage(chatId, `Пора кормить!`);
		}, query.data * 60 * 1000);
	}
});