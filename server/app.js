const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

const publicPath = path.join(__dirname, './..', 'public');
app.use(express.static(publicPath));

app.use(express.static(path.join(publicPath, './img')));

app.use('/api', apiRoutes);

app.use('/campuses', (req, res) => {
  console.log('rerouting');
  res.sendFile(publicPath + '/index.html');
});

app.use('*', (req, res) => {
  console.log('rerouting');
  res.sendFile(publicPath + '/index.html');
});

// app.get('/*', (req, res, next) => {
//   res.sendFile('index.html');
// });

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
