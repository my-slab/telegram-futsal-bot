'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ladder = undefined;

var _scraper = require('../scraper');

var scraper = _interopRequireWildcard(_scraper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const COMMANDS = {
  LADDER: 'ladder'
};

const ladder = exports.ladder = command => {
  command(COMMANDS.FIXTURE, async ctx => {
    const result = await scraper.fixture();
    return ctx.reply(`${result}`);
  });
};