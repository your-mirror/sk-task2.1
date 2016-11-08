import express from 'express';
import _ from 'lodash';

const app = express();

app.get('/', function (req, res) {
  const a = _.get(req.query, 'a', 0);
  const b = _.get(req.query, 'b', 0);
  res.send(200, Number(a) + Number(b));
});

app.get('/name', function (req, res) {
  const match = _.get(req.query, 'fullname', '').match(/([\S]+)\s?([\S]*)\s?([\S]*)\s?(.*)/i);
  let shortName = '';
  if (match !== null && match[4].length === 0) {
    const parts = _.chain(match).drop().compact().value();
    shortName += _.capitalize(_.last(parts).toLowerCase());
    if (parts.length > 1) {
      shortName += _.chain(parts).dropRight().map(function(string) {
        const symbol = _.capitalize(string.charAt(0));
        return  ` ${symbol}.`;
      }).join('');
    }
  } else {
    shortName = 'Invalid fullname';
  }

  res.send(200, shortName);
});

app.listen(5000, function () {
  console.log('Example app listening on port 3000!');
});
