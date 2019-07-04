const Sequelize = require('sequelize');
const db = require('./../db');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // set the min length to 1 b/c empty strings were not triggering allowNull
    validate: {
      len: [1],
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/200',
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1],
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Campus;
