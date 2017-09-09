'use strict';

var _fixture = require('./fixture');

var _fixture2 = _interopRequireDefault(_fixture);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async () => {
  _bot2.default.options.username = await (0, _bot.getUsername)(_bot2.default);
  console.log(`Server has initialized bot: ${_bot2.default.options.username}`);

  _bot2.default.command('fixture', async ctx => {
    ctx.reply('👀');
    const result = await (0, _fixture2.default)();
    return ctx.reply(result);
  });

  _bot2.default.hears('fixture', async ctx => {
    ctx.reply('👀');
    const result = await (0, _fixture2.default)();
    return ctx.reply(result);
  });

  _bot2.default.hears('siq', async ctx => {
    return ctx.reply('🔥');
  });

  _bot2.default.startPolling();
};

init();