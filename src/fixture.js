import puppeteer from 'puppeteer';

const FIXTURE_URL =
  'https://web.fixionline.com/anonymous/external/webView.aspx?fixicenID=117&tab=1&sportid=&divisionid=&seasonid=';

export default async () => {
  console.log('launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(FIXTURE_URL, { waitUntil: 'networkidle' });
  await page.click('a#rptComps_ctl28_LinkButton1');
  await page.waitForSelector('a[title="CC Kicks"]');
  await page.click('a[title="CC Kicks"]');
  await page.waitForSelector('div.MatchRow');
  const value = await page.evaluate(() => {
    return document.getElementsByClassName('MatchRow')[0].textContent;
  });
  browser.close();
  return value.trim();
};
