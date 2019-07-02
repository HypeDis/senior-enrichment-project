const Sequelize = require('sequelize');
const { connectionURI } = require('./../../config/dbConfig');

const db = new Sequelize(connectionURI, { logging: false });

module.exports = db;
