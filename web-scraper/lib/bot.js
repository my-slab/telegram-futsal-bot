'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsername = undefined;

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_TOKEN = '429243168:AAHJQX2W7RdqtLKg5A4bN6O5Jgb53zApYwU';
const bot = new _telegraf2.default(API_TOKEN);

const getUsername = exports.getUsername = async ({ telegram }) => {
  const { username } = await telegram.getMe();
  return username;
};

exports.default = bot;