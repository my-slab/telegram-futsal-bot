'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIXTURE_URL = undefined;

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const URL = 'https://sportfix.net/app/teamdetails.aspx';
const SPORT_FIX_ID = '186ff05f-201d-46ea-bc7b-85dc3ba3fe70';
const TEAM_ID = '91428';

const opts = {
  sportFixId: SPORT_FIX_ID,
  teamId: TEAM_ID
};

const FIXTURE_URL = exports.FIXTURE_URL = URL + '?' + _querystring2.default.encode(opts);