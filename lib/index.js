import R from 'ramda';

import bot, { getUsername } from './bot';

bot.options.username = getUsername(bot);
console.log(`Server has initialized bot nickname: ${bot.options.username}`);

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});

app.startPolling();
