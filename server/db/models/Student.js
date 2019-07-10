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
    defaultValue: '/img/default-avatar.jpg',
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

// capitalize first and last names before create
Student.beforeCreate(student => {
  student.firstName = capitalizeFirstLetter(student.firstName);
  student.lastName = capitalizeFirstLetter(student.lastName);
});

const capitalizeFirstLetter = word => {
  return word[0].toUpperCase() + word.slice(1);
};

module.exports = Student;
