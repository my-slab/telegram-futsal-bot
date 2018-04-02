'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FIXTURE_URL = 'https://web.fixionline.com/anonymous/external/webView.aspx?fixicenID=117&tab=1&sportid=&divisionid=&seasonid=';

exports.default = async () => {
  console.log('launching browser...');
  const browser = await _puppeteer2.default.launch();
  const page = await browser.newPage();
  await page.goto(FIXTURE_URL, { waitUntil: 'networkidle' });
  await page.click('a#rptComps_ctl29_LinkButton1');
  await page.waitForSelector('a[title="CC Kicks"]');
  await page.click('a[title="CC Kicks"]');
  await page.waitForSelector('div.MatchRow');
  const value = await page.evaluate(() => {
    document.querySelector('div.MatchRow div strong').textContent;
    const fixture = document.querySelectorAll('div.MatchRow div');
    const date = fixture[0].textContent;
    const time = fixture[1].textContent;
    return `${date} - ${time}`;
  });
  browser.close();
  return value.trim();
};