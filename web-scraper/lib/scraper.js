'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextMatch = undefined;

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getNextMatch = exports.getNextMatch = async () => {
  const browser = await _puppeteer2.default.launch();
  const page = await browser.newPage();
  await page.goto(_constants.FIXTURE_URL, { waitUntil: 'networkidle' });
  await page.click('a#upcommingmatchtab');
  const result = await page.evaluate(() => {
    const match = document.querySelector('#date0upcomingMatches').innerText.trim().split('\n').join(' ');
    const opponent = document.querySelector('#matchDetail0 div.againstteam').innerText;

    return `${match} vs ${opponent}`;
  });
  await browser.close();
  return result;
};