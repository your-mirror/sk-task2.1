import express from 'express';
import _ from 'lodash';

const app = express();

app.get('/', function (req, res) {
  const a = _.get(req.query, 'a', 0);
  const b = _.get(req.query, 'b', 0);
  res.send({ result: Number(a) + Number(b) });
});

app.listen(5000, function () {
  console.log('Example app listening on port 3000!');
});
