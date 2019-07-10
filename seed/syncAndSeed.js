const path = require('path');
const fs = require('fs');

const { db, Student, Campus } = require('../server/db');
const students = require('./../mock-data/students.json');
const campuses = require('./../mock-data/campuses.json');

const imageDir = path.join(__dirname, '..', 'public/img/campuses');

// fisher-yates algo from
// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

const getImages = function(path) {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        rej(err);
      }
      res(files);
    });
  });
};

db.sync({ force: true })
  .then(() => {
    return getImages(imageDir);
  })
  .then(images => {
    console.log('images', images);
    const shuffledImages = shuffle(images);
    console.log('shuffled', shuffledImages);
    campuses.forEach(campus => {
      campus.imageUrl = shuffledImages.length
        ? '/img/campuses/' + shuffledImages.pop()
        : '/img/default-campus.jpg';
    });
    return Promise.resolve();
  })
  .then(() => {
    console.log('seeding campuses');
    return Promise.all([...campuses.map(campus => Campus.create(campus))]);
  })
  .then(() => {
    console.log('seeding students');
    return Promise.all([...students.map(student => Student.create(student))]);
  })
  .then(() => {
    console.log('complete');
    db.close();
  })
  .catch(e => console.error('seed error', e));
