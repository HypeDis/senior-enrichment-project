import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useForm, useValidation } from './../hooks';
import { resetCurrentStudent, getStudentsFromDb } from './../store';
import renderInput from './renderInput';
import studentValidator from '../../validation/studentValidator';

const StudentForm = props => {
  const [errors, validateInputs, setErrors] = useValidation(studentValidator);

  const isNewStudent = location => {
    const path = location.pathname;
    const isNew = path.includes('new');
    return isNew;
  };

  const createStudent = newStudentObj => {
    axios
      .post('/api/students', newStudentObj)
      .then(response => {
        console.log('student form response', response.data);

        // handling email validation on server only for now. need to add a client side email validator
        if (response.data.error) {
          setErrors({ email: 'put in a valid email' });
          return;
        }
        props.getStudents();
        props.history.push(`/students/${response.data.student.id}`);
      })
      .catch(e => console.error('studentForm error', e));
  };

  const updateStudent = (id, updateObj) => {
    axios.put(`/api/students/${id}`, updateObj).then(response => {
      if (response.error) {
        return;
      }
      props.getStudents();
      props.history.push(`/students/${id}`);
    });
  };

  const createOrUpdateStudent = () => {
    const isValid = validateInputs(values);

    if (!isValid) {
      console.log('cancelling db connection');
      return;
    }

    if (isNewStudent(props.location)) {
      createStudent(values);
    } else {
      updateStudent(props.currentStudent.id, values);
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

  // useEffect(() => {
  //   // grab initial values from store
  //   setValues(props.currentStudent);
  // }, []);

  return (
    <div>
      {renderTitle()}

      <form onSubmit={handleSubmit}>
        {renderInput('First Name', 'firstName', handleChange, values, errors)}

        {renderInput('Last Name', 'lastName', handleChange, values, errors)}
        {renderInput('Email', 'email', handleChange, values, errors)}
        {renderInput('GPA', 'gpa', handleChange, values, errors)}
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
