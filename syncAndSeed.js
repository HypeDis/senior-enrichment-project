const { db, Student, Campus } = require('./server/db/');

const createCampus = (name, address, description = '') => {
  return Campus.create({
    name,
    address,
    description,
  });
};

const createStudent = (firstName, lastName, email, gpa) => {
  return Student.create({ firstName, lastName, email, gpa });
};

db.sync({ force: true })
  .then(() => {
    console.log('starting seed');
    return Promise.all([
      createCampus('UW', '123 main st.', 'best school in the world'),
      createCampus('NYU', '542 5th ave', 'average at best'),
      createStudent('John', 'Doe', 'john@gmail.com', 3.93),
      createStudent('Sally', 'Jenkins', 'sally@gmail.com', 2.3523432),
    ]);
  })
  .then(([uw, nyu, john, sally]) => {
    return Promise.all([john.setCampus(uw), sally.setCampus(nyu)]);
  })
  .then(() => {
    db.close().then(() => console.log('seeding complete'));
  })
  .catch(e => console.error('seeding failed', e));
