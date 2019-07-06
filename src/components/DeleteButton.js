import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCampusesFromDb, getStudentsFromDb } from './../store';

const DeleteButton = props => {
  const id = props.id;
  const path = props.location.pathname.slice(1).trim();
  console.log(path);
  console.log('delete button', props.location);

  const deleteItem = () => {
    axios
      .delete(`/api/${path}/${id}`)
      .then(resp => {
        if (resp.data.error) {
          console.log(resp.data.error);
        } else {
          if (path === 'campuses') {
            props.getCampuses();
          }
          if (path === 'students') {
            props.getStudents();
          }
        }
      })
      .catch(e => console.error('delete error', e));
  };

  return <button onClick={deleteItem}>X</button>;
};

const mapDispatch = dispatch => ({
  getCampuses: () => {
    dispatch(getCampusesFromDb());
  },
  getStudents: () => {
    dispatch(getStudentsFromDb());
  },
});
export default connect(
  null,
  mapDispatch
)(DeleteButton);