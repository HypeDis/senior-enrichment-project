const express = require('express');
const router = express.Router();

const { Student, Campus } = require('./../../db');

// GET to /api/students
// get all students
router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

// GET to /api/students/:studentId
// get a student and their campus
router.get('/:studentId', (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByPk(studentId, { include: [Campus] })
    .then(student => {
      res.send(student);
    })
    .catch(next);
});

// POST to /api/students
router.post('/', (req, res, next) => {
  const newStudent = req.body;
  Student.create(newStudent)
    .then(student => res.send({ message: 'success', student }))
    .catch(e => {
      res.send({ error: e });
      next(e);
    });
});
module.exports = router;

router.delete('/:studentId', (req, res, next) => {
  const id = req.params.studentId;
  Student.destroy({ where: { id } })
    .then(resp => {
      if (resp === 0) {
        return res.send({ error: 'student not found' });
      }
      res.send({ message: 'delete student success' });
    })
    .catch(e => {
      res.send({ error: e });
      next(e);
    });
});
