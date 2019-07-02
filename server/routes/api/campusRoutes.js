const express = require('express');
const router = express.Router();

const { Campus } = require('./../../db');

router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

module.exports = router;
