import { getNextMatch } from './scraper';
import bot, { getUsername } from './bot';

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

  bot.startPolling();
};

init();
