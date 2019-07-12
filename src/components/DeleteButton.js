import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCampusesFromDb, getStudentsFromDb } from './../store';

const DeleteButton = props => {
  const id = props.id;
  const path = props.location.pathname.slice(1).trim();

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

  return (
    <div className="delete-btn-container">
      <form
        onSubmit={e => {
          // prevents any event handlers from parent elements from triggering
          e.stopPropagation();
          e.preventDefault();
          deleteItem();
        }}
      >
        <button
          type="submit"
          className="uk-close-large"
          onClick={e => e.stopPropagation()}
          uk-close="true"
        />
      </form>
    </div>
  );
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
