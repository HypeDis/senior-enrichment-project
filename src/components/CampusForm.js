import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm } from './../hooks';
import { resetCurrentCampus, getCampusesFromDb } from './../store';
import campusValidator from '../../validation/campusValidator';
import renderInput from './renderInput';
import { useValidation } from './../hooks';

const CampusForm = props => {
  const [errors, validateInputs] = useValidation(campusValidator);

  const isNewCampus = location => {
    const path = location.pathname;
    const isNew = path.includes('new');
    return isNew;
  };

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

  const createOrUpdateCampus = () => {
    const isValid = validateInputs(values);
    console.log('campus is valid', isValid);

    if (!isValid) {
      console.log('canceling server connection');
      return;
    }

    if (isNewCampus(props.location)) {
      console.log('creating new campus');
      createCampus(values);
    } else {
      console.log('updating campus');
      updateCampus(props.currentCampus.id, values);
    }
  };

  const { handleSubmit, handleChange, values } = useForm(
    createOrUpdateCampus,
    props.currentCampus
  );

  const renderTitle = () => {
    if (isNewCampus(props.location)) {
      return <h1>Add A Campus</h1>;
    } else {
      return <h1>Update Campus</h1>;
    }
  };

  return (
    <div>
      {renderTitle()}

      <form onSubmit={handleSubmit}>
        {renderInput('Name', 'name', handleChange, values, errors)}

        {renderInput('Address', 'address', handleChange, values, errors)}

        {/* make the text area collapsed on default */}
        <div className="field">
          <label>Description</label>
          <div>
            <textarea
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              className="uk-textarea"
            />
          </div>
        </div>
        <div className="field">
          <button className="uk-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
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
