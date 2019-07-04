import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm } from './../hooks';
import { resetCurrentCampus, getCampusesFromDb } from './../store';

const CampusForm = props => {
  const isNewCampus = location => {
    const path = location.pathname;
    const isNew = path.includes('new');
    return isNew;
  };

  const createCampus = () => {
    // BUG: empty strings not triggering allownull
    const newCampus = {
      name: values.name,
      address: values.address,
      description: values.description,
    };
    axios
      .post('/api/campuses', newCampus)
      .then(response => {
        console.log('campus form response', response.data);
        if (response.data.error) {
          return;
        }
        props.getCampuses();
        props.history.push('/');
      })
      .catch(e => console.error('campusForm error', e));
  };

  const createOrUpdateCampus = () => {
    if (isNewCampus(props.location)) {
      createCampus();
    } else {
      // updateCampus();
    }
  };
  const { handleSubmit, handleChange, values, setValues } = useForm(
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

  useEffect(() => {
    // grab initial values from store
    setValues(props.currentCampus);
  }, []);

  const renderInput = (name, value) => {
    return (
      <div className="field">
        <label>{name}</label>
        <div>
          <input
            type="text"
            value={values[value]}
            name={value}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderTitle()}

      <form onSubmit={handleSubmit}>
        {renderInput('Name', 'name')}

        {renderInput('Address', 'address')}

        {/* make the text area collapsed on default */}
        <div className="field">
          <label>Description</label>
          <div>
            <textarea
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit">Submit</button>
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
