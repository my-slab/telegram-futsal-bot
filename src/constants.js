import querystring from 'querystring';

const BASE_URL = 'https://sportfix.net/app/';
const COMPETITION_ROUTE = 'competition.aspx';
const DIVISION_ID = '806';
const FIXTURE_ROUTE = 'teamdetails.aspx';
const SEASON_ID = '3196';
const SPORT_FIX_ID = '186ff05f-201d-46ea-bc7b-85dc3ba3fe70';
const SPORT_ID = '329';
const TEAM_ID = '91428';

const fixtureOpts = {
  sportFixId: SPORT_FIX_ID,
  teamId: TEAM_ID
};

const competitionOpts = {
  div: DIVISION_ID,
  sea: SEASON_ID,
  sp: SPORT_ID,
  sportFixId: SPORT_FIX_ID
};

const buildUrl = (url, opts) => BASE_URL + url + '?' + querystring.encode(opts);

export const callbackButtons = {
  IN: 'in',
  MAYBE: 'maybe',
  OUT: 'out'
};

export const COMPETITION_URL = buildUrl(COMPETITION_ROUTE, competitionOpts);

export const FIXTURE_URL = buildUrl(FIXTURE_ROUTE, fixtureOpts);

export const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN || '';
