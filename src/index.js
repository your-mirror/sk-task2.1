import express from 'express';
import _ from 'lodash';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', function (req, res) {
  const a = _.get(req.query, 'a', 0);
  const b = _.get(req.query, 'b', 0);
  res.send(200, Number(a) + Number(b));
});

app.get('/name', function (req, res) {
  const fullName = _.get(req.query, 'fullname', '');
  const wrongSymbols = fullName.match(/[\d_\/]/);
  const match = _.get(req.query, 'fullname', '').match(/([\S]+)\s*([\S]*)\s*([\S]*)\s*(.*)/i);
  const parts = _.chain(match).drop().compact().value();

  if (fullName.length === 0 || wrongSymbols !== null || parts.length > 3) {
    res.send(200, 'Invalid fullname');
  }
  let shortName = '';
  shortName += _.capitalize(_.last(parts).toLowerCase());
  if (parts.length > 1) {
    shortName += _.chain(parts).dropRight().map(function(string) {
      const symbol = _.capitalize(string.charAt(0));
      return  ` ${symbol}.`;
    }).join('');
  }

  res.send(200, shortName);
});

app.get('/task3', function (req, res) {
  const usernameUrl = _.get(req.query, 'username', '');
  const match = usernameUrl
    .match(/(?:https:|http:)?(?:\/\/)?(?:[a-z0-9\.-]+\.[a-z0-9-]+)?\/?@?([a-z\.\_]+)/i);
  const username = _.chain(match).drop().value();
  if (username.length === 0) {
    res.send(200, 'Invalid fullname');
  }
  res.send(200, '@' + username);
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
