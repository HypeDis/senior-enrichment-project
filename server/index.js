const { db } = require('./db');
const app = require('./app');

const { PORT } = require('./../config/serverConfig');

db.sync()
  .then(() => {
    console.log('db synced');
    app.listen(PORT, () => {
      console.log('server is listening on port ' + PORT);
    });
  })
  .catch(e => console.error('sync error', e));
