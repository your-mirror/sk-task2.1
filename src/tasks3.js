import express from 'express';
import _ from 'lodash';

const router = express.Router();

router.get('/task3a', function (req, res) {
  const a = _.get(req.query, 'a', 0);
  const b = _.get(req.query, 'b', 0);
  res.send(200, Number(a) + Number(b));
});

export { router }
