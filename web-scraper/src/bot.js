import Telegraf from 'telegraf';

import { getNextMatch, getTable } from './scraper';

const API_TOKEN = process.env.TELEGRAM_API_TOKEN || '';
const bot = new Telegraf(API_TOKEN);

const getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

const commandFixture = async ctx => {
  ctx.reply('📅');
  try {
    const result = await getNextMatch();
    return ctx.reply(result);
  } catch (e) {
    console.log(e);
    ctx.reply('️⛔️ Something went wrong');
  }
};

const commandTable = async ctx => {
  ctx.reply('🔝');
  try {
    const result = await getTable();
    return ctx.replyWithMarkdown(result);
  } catch (e) {
    console.log(e);
    ctx.reply('⛔️ Something went wrong');
  }
});

export const setup = async (bot) => {
  bot.options.username = await getUsername(bot);
  bot.command('fixture', commandFixture);
  bot.command('table', commandTable);
  bot.startPolling();
}

export default bot;