import Telegraf from 'telegraf';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';

import { getNextMatch, getTable } from './scraper';

const API_TOKEN = process.env.TELEGRAM_API_TOKEN || '';
const bot = new Telegraf(API_TOKEN);

const getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

const commandAvailable = async ctx => {
  try {
    return ctx.reply(
      '<b>In 👍</b> or <b>Out 👎</b>',
      Extra.HTML().markup(m =>
        m.inlineKeyboard([
          m.callbackButton('In', 'In'),
          m.callbackButton('Out', 'Out')
        ])
      )
    );
  } catch (e) {
    console.log(e);
    ctx.reply('⛔️ Something went wrong');
  }
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
};

const onCallback = async ctx => {
  const { data, from: { username } } = ctx.callbackQuery;
  ctx.answerCbQuery(`${username}: ${data}`);
};

export const setup = async bot => {
  bot.options.username = await getUsername(bot);
  bot.command('available', commandAvailable);
  bot.command('fixture', commandFixture);
  bot.command('table', commandTable);
  bot.on('callback_query', onCallback);
  bot.startPolling();
};

export default bot;
