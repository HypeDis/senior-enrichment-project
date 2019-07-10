const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const apiRoutes = require('./routes/api');

app.use(morgan('combined'));
app.use(express.json());
//need this for postman
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, '..', 'node_modules')));
const publicPath = path.join(__dirname, './..', 'public');
app.use(express.static(publicPath));

app.use('/api', apiRoutes);

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
