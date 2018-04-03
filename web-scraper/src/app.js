import { getTable, getNextMatch } from './scraper';
import bot, { getUsername } from './bot';
import Extra from 'telegraf/extra';

const init = async () => {
  bot.options.username = await getUsername(bot);
  console.log(`Server has initialized bot: ${bot.options.username}`);

  bot.command('fixture', async ctx => {
    ctx.reply('📅');
    try {
      const result = await getNextMatch();
      return ctx.reply(result);
    } catch (e) {
      console.log(e);
      ctx.reply('️⛔️ Something went wrong');
    }
  });

  bot.command('table', async ctx => {
    ctx.reply('🔝');
    try {
      const result = await getTable();
      return ctx.reply(result, Extra.markdown());
    } catch (e) {
      console.log(e);
      ctx.reply('⛔️ Something went wrong');
    }
  });

  bot.startPolling();
};

init();
