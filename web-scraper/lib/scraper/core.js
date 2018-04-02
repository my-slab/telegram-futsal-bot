'use strict';

var _fp = require('lodash/fp');

async function selectCompetition(page, selector) {
  const result = await page.evaluate(() => (0, _fp.pipe)(_fp.values, (0, _fp.filter)((0, _fp.pipe)((0, _fp.get)('innerText'), (0, _fp.equal)(CONSTANTS.COMPETITION))), _fp.first)(selector));
  return result;
}

async function navigateToCompetition(page) {
  await page.goto(FIXTURE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('div.MatchRow');
  const selector = document.querySelectorAll('li.item a');
  const link = await selectCompetition(page, selector);
  await page.click(link);
  return page;
}