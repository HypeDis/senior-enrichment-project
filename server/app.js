const express = require('express');

const app = express();
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
