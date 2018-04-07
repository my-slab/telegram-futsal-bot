import Telegraf from 'telegraf';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';

import { callbackButtons } from './constants';
import { getNextMatch, getTable } from './scraper';

const API_TOKEN = process.env.TELEGRAM_API_TOKEN || '';
const bot = new Telegraf(API_TOKEN);

const getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

const commandAvailable = async ctx => {
  try {
    const { IN, MAYBE, OUT } = callbackButtons;
    return ctx.reply(
      '<b>In 👍</b> or <b>Out 👎</b>',
      Extra.HTML().markup(m =>
        m.inlineKeyboard([
          m.callbackButton(IN, IN),
          m.callbackButton(OUT, OUT),
          m.callbackButton(MAYBE, MAYBE)
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
  const { IN, MAYBE, OUT } = callbackButtons;
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
