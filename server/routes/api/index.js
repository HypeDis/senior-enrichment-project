const express = require('express');

const router = express.Router();

const campusRoutes = require('./campusRoutes');
const studentRoutes = require('./studentRoutes');

router.get('/', (req, res, next) => {
  res.send('api routes');
});

// api/campuses
router.use('/campuses', campusRoutes);
// api/students
router.use('/students', studentRoutes);

module.exports = router;
