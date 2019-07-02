const express = require('express');
const router = express.Router();

const { Student, Campus } = require('./../../db');

// /api/students
router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

// /api/students/:studentId
router.get('/:studentId', (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByPk(studentId, { include: [Campus] })
    .then(student => {
      res.send(student);
    })
    .catch(next);
});

module.exports = router;
