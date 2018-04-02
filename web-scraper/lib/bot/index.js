'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = undefined;

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

var _fp = require('lodash/fp');

var _config = require('../config');

var _commands = require('./commands');

var commands = _interopRequireWildcard(_commands);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createBot = new _telegraf2.default(_config.API_TOKEN);

const getUsername = async bot => asyncPipe((0, _fp.get)('telegram'), (0, _fp.get)('getMe'), fn => fn(), (0, _fp.get)('username'))(bot);

const registerCommands = bot => (0, _fp.pipe)((0, _fp.get)('command'), (0, _fp.over)(commands));

const setup = exports.setup = async () => {
  const bot = createBot();
  bot.options.username = await getUsername(bot);
  registerCommands(bot);
  bot.startPolling();
};