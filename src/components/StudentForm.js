import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm } from './../hooks';
import { resetCurrentStudent, getStudentsFromDb } from './../store';

const StudentForm = props => {
  const isNewStudent = location => {
    const path = location.pathname;
    const isNew = path.includes('new');
    return isNew;
  };

  const createStudent = () => {
    // BUG: empty strings not triggering allownull
    const newStudent = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gpa: values.gpa,
      campusId: values.campusId,
    };
    axios
      .post('/api/students', newStudent)
      .then(response => {
        console.log('student form response', response.data);
        if (response.data.error) {
          return;
        }
        props.getStudents();
        props.history.push('/students');
      })
      .catch(e => console.error('studentForm error', e));
  };

  const createOrUpdateStudent = () => {
    if (isNewStudent(props.location)) {
      createStudent();
    } else {
      // updateStudent();
    }
  };

  const { handleSubmit, handleChange, values, setValues } = useForm(
    createOrUpdateStudent,
    props.currentStudent
  );

  const renderTitle = () => {
    if (isNewStudent(props.location)) {
      return <h1>Add A Student</h1>;
    } else {
      return <h1>Update Student</h1>;
    }
  };

  useEffect(() => {
    // grab initial values from store
    setValues(props.currentStudent);
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
        {renderInput('First Name', 'firstName')}

        {renderInput('Last Name', 'lastName')}
        {renderInput('Email', 'email')}
        {renderInput('GPA', 'gpa')}
        <div className="field">
          <label>Campus</label>
          <div className="student-select">
            <select
              name="campusId"
              value={values.campusId}
              onChange={handleChange}
            >
              <option value="">--None--</option>
              {props.campuses.map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

const mapState = state => ({
  currentStudent: state.currentStudent,
  campuses: state.campuses,
});
const mapDispatch = dispatch => ({
  resetStudent: () => {
    dispatch(resetCurrentStudent());
  },
  getStudents: () => {
    dispatch(getStudentsFromDb());
  },
});
export default connect(
  mapState,
  mapDispatch
)(StudentForm);
