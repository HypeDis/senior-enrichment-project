const express = require('express');
const router = express.Router();

const { Campus, Student } = require('./../../db');

// GET to /api/campuses
// get all campuses
router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

// GET to /api/campuses/:campusId
// get a campus and all of its students
router.get('/:campusId', (req, res, next) => {
  const campusId = req.params.campusId;
  Campus.findByPk(campusId, { include: [Student] })
    .then(campus => {
      res.send(campus);
    })
    .catch(next);
});

// POST to /api/campuses
// add a campus to the db
router.post('/', (req, res, next) => {
  const newCampus = req.body;

  Campus.create(newCampus)
    .then(campus => {
      res.send({ message: 'success', campus });
    })
    .catch(e => {
      res.send({ error: e });
      next(e);
    });
});

router.delete('/:campusId', (req, res, next) => {
  const id = req.params.campusId;
  Campus.destroy({ where: { id } })
    .then(resp => {
      if (resp === 0) {
        console.log('campus not found');
        return res.send({ error: 'campus not found' });
      }
      res.send({ message: 'delete campus success', resp });
    })
    .catch(e => {
      res.send({ error: e });
      next(e);
    });
});

module.exports = router;
