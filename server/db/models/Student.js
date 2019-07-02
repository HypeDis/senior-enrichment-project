const Sequelize = require('sequelize');
const db = require('./../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'defaultAvatar.jpeg',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  gpa: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;
