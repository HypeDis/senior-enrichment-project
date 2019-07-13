import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { resetCurrentCampus, getCampusesFromDb } from './../store';
import campusValidator from '../../validation/campusValidator';
import Form from './Form';

const CampusForm = props => {
  // [campusInputs] is used as a template to create the input elements in <Form />
  // chose an array of objects so that I could keep everything in order.
  const campusInputs = [
    { type: 'title', name: 'Campus' },
    { type: 'input', name: 'Name', value: 'name' },
    { type: 'input', name: 'Address', value: 'address' },
    { type: 'textArea', name: 'Description', value: 'description' },
  ];

  const createCampus = newCampusObj => {
    axios
      .post('/api/campuses', newCampusObj)
      .then(response => {
        console.log('new campuse response', response.data);
        if (response.data.error) {
          return;
        }
        props.getCampuses();
        props.history.push(`/campuses/${response.data.campus.id}`);
      })
      .catch(e => console.error('campusForm error', e));
  };

  const updateCampus = (id, updateObj) => {
    console.log('campus id', id);
    axios
      .put(`/api/campuses/${id}`, updateObj)
      .then(response => {
        if (response.error) {
          return;
        }
        console.log('response', response.data);
        props.getCampuses();
        props.history.push(`/campuses/${id}`);
      })
      .catch(e => console.error('update campus error', e));
  };

  // called when handleSubmit is called (in <Form />).
  const createOrUpdateCampus = (validateInputs, values, isNew, id) => {
    const isValid = validateInputs(values);

    if (!isValid) {
      console.log('invalid inputs, canceling query');
      return;
    }

    if (isNew) {
      console.log('creating new campus');
      createCampus(values);
    } else {
      console.log('updating campus');
      updateCampus(id, values);
    }
  };

  return (
    <Form
      inputs={campusInputs}
      validator={campusValidator}
      createOrUpdate={createOrUpdateCampus}
      currentInfo={props.currentCampus}
    />
  );
};

const mapState = state => ({ currentCampus: state.currentCampus });
const mapDispatch = dispatch => ({
  resetCampus: () => {
    dispatch(resetCurrentCampus());
  },
  getCampuses: () => {
    dispatch(getCampusesFromDb());
  },
});
export default connect(
  mapState,
  mapDispatch
)(CampusForm);
