import React from 'react';
export default (name, isNew) => {
  if (isNew) {
    return <h1>Add A {name}</h1>;
  } else {
    return <h1>Update {name}</h1>;
  }
};
