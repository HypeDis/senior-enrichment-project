const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, './..', 'public')));

app.use(express.static(path.join(__dirname, './..', 'public/img')));

app.use('/api', apiRoutes);

app.get('/campuses', (req, res, next) => {
  res.sendFile('index.html');
});

app.get('/*', (req, res, next) => {
  res.sendFile('index.html');
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
