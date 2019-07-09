const path = require('path');
const fs = require('fs');

const { db, Student, Campus } = require('./server/db/');
const students = require('./mock-data/students.json');
const campuses = require('./mock-data/campuses.json');

// db.sync({ force: true })
//   .then(() => {
//     console.log('seeding campuses');
//     return Promise.all([...campuses.map(campus => Campus.create(campus))]);
//   })
//   .then(() => {
//     console.log('seeding students');
//     return Promise.all([...students.map(student => Student.create(student))]);
//   })
//   .then(() => {
//     console.log('complete');
//     db.close();
//   })
//   .catch(e => console.error('seed error', e));

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
      createStudent('Bob', 'Roberts', 'bobbyR@yahoo.com', 1.7),
      createStudent('Lucy', 'Park', 'lp89@hotmail.com', 3.82),
      createStudent('Meg', 'Ryan', 'meg@hotmail.com', 4.0),
      createStudent('Amy', 'Poehler', 'amy@gmail.com', 2.3),
    ]);
  })
  .then(([uw, nyu, john, sally, bob, lucy]) => {
    return Promise.all([
      john.setCampus(uw),
      sally.setCampus(uw),
      bob.setCampus(uw),
      lucy.setCampus(),
    ]);
  })
  .then(() => {
    db.close().then(() => console.log('seeding complete'));
  })
  .catch(e => console.error('seeding failed', e));
