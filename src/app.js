import fixture from './fixture';
import bot, { getUsername } from './bot';

const init = async () => {
  bot.options.username = await getUsername(bot);
  console.log(`Server has initialized bot: ${bot.options.username}`);

  bot.command('fixture', async ctx => {
    ctx.reply('👀');
    const result = await fixture();
    return ctx.reply(result);
  });

  bot.hears('siq', async ctx => {
    return ctx.reply('🔥');
  });

  bot.startPolling();
};

init();
