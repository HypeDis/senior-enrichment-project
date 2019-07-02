const express = require('express');
const router = express.Router();

const { Campus, Student } = require('./../../db');

// GET to /api/campuses
router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

// GET to /api/campuses/:campusId
router.get('/:campusId', (req, res, next) => {
  const campusId = req.params.campusId;
  Campus.findByPk(campusId, { include: [Student] })
    .then(campus => {
      res.send(campus);
    })
    .catch(next);
});

module.exports = router;
