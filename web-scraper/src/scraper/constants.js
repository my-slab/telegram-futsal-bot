const FIXTURE_URL = 'https://sportfix.net/app/teamdetails.aspx';
const SPORT_FIX_ID = '186ff05f-201d-46ea-bc7b-85dc3ba3fe70';
const TEAM_ID = '91428';

const opts = {
  sportFixId: SPORT_FIX_ID,
  teamId: TEAM_ID
};

export { FIXTURE_URL: FIXTURE_URL + '?' + querystring.encode(opts) };
