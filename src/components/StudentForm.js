import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { resetCurrentStudent, getStudentsFromDb } from './../store';
import studentValidator from '../../validation/studentValidator';
import Form from './Form';
import checkNew from './../utils/checkNew';
const StudentForm = props => {
  const inputs = [
    { type: 'title', name: 'Student' },
    { type: 'input', name: 'First Name', value: 'firstName' },
    { type: 'input', name: 'Last Name', value: 'lastName' },
    { type: 'input', name: 'Email', value: 'email' },
    { type: 'input', name: 'GPA', value: 'gpa' },
    {
      type: 'select',
      name: 'Campus',
      value: 'campusId',
      selections: props.campuses,
      optionKey: 'name',
    },
  ];

  useEffect(() => {
    if (checkNew(props.location)) {
      props.resetStudent();
      console.log('reset current student');
    }
  }, []);

  const createStudent = (newStudentObj, setErrors) => {
    axios
      .post('/api/students', newStudentObj)
      .then(response => {
        console.log('/new student form response', response.data);
        console.log('newStudentObj', newStudentObj);

        // handling email validation on server only for now. need to add a client side email validator
        if (response.data.errors) {
          setErrors({ email: 'put in a valid email' });
          return;
        }
        props.getStudents();
        props.history.push(`/students/${response.data.student.id}`);
      })
      .catch(e => console.error('studentForm error', e));
  };

  const updateStudent = (id, updateObj, setErrors) => {
    axios.put(`/api/students/${id}`, updateObj).then(response => {
      console.log('student update response', response.data);
      if (response.data.errors) {
        setErrors({ email: 'put in a valid email' });
        return;
      }
      props.getStudents();
      props.history.push(`/students/${id}`);
    });
  };

  const createOrUpdateStudent = (
    validateInputs,
    id = null,
    isNew,
    setErrors,
    values
  ) => {
    const isValid = validateInputs(values);

    if (!isValid) {
      console.log('invalid inputs, canceling query');
      return;
    }

    if (isNew) {
      createStudent(values, setErrors);
    } else {
      updateStudent(id, values, setErrors);
    }
  };

  return (
    <Form
      inputs={inputs}
      validator={studentValidator}
      createOrUpdate={createOrUpdateStudent}
      currentInfo={props.currentStudent}
    />
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
