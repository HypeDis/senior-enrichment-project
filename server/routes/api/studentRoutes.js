const express = require('express');
const router = express.Router();

const { Student } = require('./../../db');

router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

module.exports = router;
