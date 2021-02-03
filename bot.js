const Discord = require('discord.js');
const { Telegraf } = require('telegraf');

const DiscordClient = new Discord.Client();
const TelegramClient = new Telegraf(TELEGRAM_BOT_TOKEN);

const TelegramChannel = "TELEGRAM_GROUP_ID"; //eg. -1231231231231
const DiscordChannel = "DISCORD_CHANNEL_ID"; //eg. 123123123123123123

const BotName = "BOT_NAME"

TelegramClient.command('pass', ctx => {
    var TelegramUsername = ctx.from.username;
    if (TelegramUsername == 'undefinded') TelegramUsername = ctx.from.first_name;

    var TelegramMessage = ctx.message.text.slice(6);
    if (TelegramMessage.startsWith(BotName)) TelegramMessage = TelegramMessage.slice(BotName.length);
    if (TelegramMessage.trim() == "") return;

    DiscordClient.channels.cache.get(DiscordChannel).send(`${ctx.from.username}: ${TelegramMessage}`);
});

DiscordClient.on('message', msg => {
    if(msg.content.startsWith('!pass ')) {
        var DiscordMessage = msg.content.slice(6);
        if(DiscordMessage.trim() == "") return;
        
        TelegramClient.telegram.sendMessage(TelegramChannel, `${msg.author.username}: ${DiscordMessage}`);
    }
});

process.once('SIGINT', () => TelegramClient.stop('SIGINT'));
process.once('SIGTERM', () => TelegramClient.stop('SIGTERM'));

DiscordClient.login(DISCORD_BOT_TOKEN);
TelegramClient.launch();

console.log("Bot running...");
