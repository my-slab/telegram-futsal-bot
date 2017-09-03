import R from 'ramda';

import bot, { getUsername } from './bot';

const init = async () => {
  bot.options.username = await getUsername(bot);
  console.log(`Server has initialized bot: ${bot.options.username}`);

  bot.hears('fixture', ctx => {
    ctx.reply('Let me fetch that for you...');
    // todo: (scrape fixture)
    return true;
  });

  bot.hears('hi', ctx => {
    console.log('hey!');
    return ctx.reply('Hey!');
  });

  bot.startPolling();
};

init();
