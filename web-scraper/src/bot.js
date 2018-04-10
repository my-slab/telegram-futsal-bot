import Telegraf from 'telegraf';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';
import { values } from 'lodash';

import { callbackButtons, TELEGRAM_API_TOKEN } from './constants';
import { getNextMatch, getTable } from './scraper';

const state = {
  fixture: {
    id: null,
    in: new Set(),
    maybe: new Set(),
    out: new Set(),
    string: null
  }
};
const bot = new Telegraf(TELEGRAM_API_TOKEN);

const getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

const availabilityKeyboard = () => {
  const { IN, MAYBE, OUT } = callbackButtons;

  return Extra.HTML().markup(m =>
    m.inlineKeyboard([
      m.callbackButton(IN.toUpperCase(), IN),
      m.callbackButton(OUT.toUpperCase(), OUT),
      m.callbackButton(MAYBE.toUpperCase(), MAYBE)
    ])
  );
};

const updateAvailability = (status, player) => {
  values(callbackButtons).map(elem => state.fixture[elem].delete(player));
  state.fixture[status.toLowerCase()].add(player);
};

const commandFixture = async ctx => {
  ctx.reply('📅');
  try {
    let result = await getNextMatch();
    state.fixture.string = result;

    result = await ctx.reply(result, availabilityKeyboard());

    const { chat: { id: chatId }, message_id: messageId } = result;
    state.fixture.chatId = chatId;
    state.fixture.messageId = messageId;
  } catch (e) {
    console.log(e);
    await ctx.reply('️Something went wrong');
  }
};

const commandTable = async ctx => {
  ctx.reply('🔝');
  try {
    const result = await getTable();
    await ctx.replyWithMarkdown(result);
  } catch (e) {
    console.log(e);
    await ctx.reply('Something went wrong');
  }
};

const onCallback = async ctx => {
  try {
    const { data, from: { username } } = ctx.callbackQuery;

    updateAvailability(data, username);

    let result = values(callbackButtons)
      .map(elem => [elem, state.fixture[elem]])
      .map(
        ([key, value]) =>
          `<b>${key.toUpperCase()}:</b>\n` +
          Array.from(value)
            .map(value => '+ ' + value + '\n')
            .join('')
      )
      .join('\n');

    result = state.fixture.string + '\n\n' + result;

    result = await ctx.editMessageText(result, availabilityKeyboard());
    const { chat: { id: chatId }, message_id: messageId } = result;
    state.fixture.chatId = chatId;
    state.fixture.messageId = messageId;
  } catch (e) {
    console.log(e);
  }
};

export const setup = async bot => {
  bot.options.username = await getUsername(bot);
  bot.command('fixture', commandFixture);
  bot.command('table', commandTable);
  bot.on('callback_query', onCallback);
  bot.startPolling();
};

export default bot;
