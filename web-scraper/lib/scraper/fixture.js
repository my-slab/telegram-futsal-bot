"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fixture = exports.fixture = async () => {
  const browser = await puppeteer.launch();
  const result = pipe(setup, navigateToCompetition, selectTeam, selectNextFixture)(browser);
  browser.close();
  return result;
};