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
      if (!campus) {
        // const campusError = new Error('Campus is null');
        return Promise.reject('Campus is null');
      }
      res.send(campus);
    })
    .catch(e => {
      next({ error: e });
    });
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

// DELETE to /api/campuses/:campusId
// delete a campus from db
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

// PUT to /api/campuses/:campusId
// update a user
router.put('/:campusId', (req, res, next) => {
  const id = req.params.campusId;
  const campusObj = req.body;
  if (!Object.keys(campusObj).length) {
    return next({ error: 'empty fields' });
  }
  Campus.findByPk(id)
    .then(campus => {
      console.log('campus obj', campusObj);
      return campus.update(campusObj);
    })
    .then(resp => {
      res.send({ message: 'campus updated successfully' });
    })
    .catch(next);
});

module.exports = router;
