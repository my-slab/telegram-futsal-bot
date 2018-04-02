'use strict';

var _scraper = require('./scraper');

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async () => {
  _bot2.default.options.username = await (0, _bot.getUsername)(_bot2.default);
  console.log(`Server has initialized bot: ${_bot2.default.options.username}`);

  _bot2.default.command('fixture', async ctx => {
    ctx.reply('📅');
    try {
      const result = await (0, _scraper.getNextMatch)();
      return ctx.reply(result);
    } catch (e) {
      console.log(e);
      ctx.reply('️⛔️ Something went wrong');
    }
  });

  _bot2.default.startPolling();
};

init();