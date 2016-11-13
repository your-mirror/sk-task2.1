import express from 'express';
import _ from 'lodash';
import fetch from 'node-fetch';

const pathName = 'tasks3a';
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
const router = express.Router();
let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

router.get(`/${pathName}*`, function (req, res) {
  let data;
  // on base url
  if (_.includes([`/${pathName}`, `/${pathName}/`], req.path)) {
    data = pc;
  }
  else if (req.path === '/tasks3a/volumes') {
    data = volumes();
  } else {
    data = base(req);
  }

  if (data === 'Not Found') {
    res.send(404, data);
  } else {
    res.send(200, JSON.stringify(data));
  }
});

function base(request) {
  'use strict';
  if (request.path.match(/[^\w\/]/) !== null) {
    return 'Not Found';
  }
  const property = _.chain(request.path).split('/').drop(2).join('.').value();
  return (_.get(pc, property) !== undefined) ? _.get(pc, property) : 'Not Found';
}

function volumes() {
  'use strict';
  let mergedHdd = _.reduce(pc.hdd, function(result, hdd, key) {
    result[hdd.volume] = (result.hasOwnProperty(hdd.volume) === false)
      ? hdd.size : result[hdd.volume] + hdd.size;
    return result;
  }, {});
  mergedHdd = _.mapValues(mergedHdd, function(size) { return size + 'B'; });

  return mergedHdd;
}

export { router }
