import puppeteer from 'puppeteer';

import { FIXTURE_URL } from './constants';

export const getNextMatch = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(FIXTURE_URL, { waitUntil: 'networkidle' });
  await page.click('a#upcommingmatchtab');
  const result = await page.evaluate(() => {
    const match = document
      .querySelector('#date0upcomingMatches')
      .innerText.trim()
      .split('\n')
      .join(' ');
    const opponent = document.querySelector('#matchDetail0 div.againstteam')
      .innerText;

    return `${match} vs ${opponent}`;
  });
  await browser.close();
  return result;
};
