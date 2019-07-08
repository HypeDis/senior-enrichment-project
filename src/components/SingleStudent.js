import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentStudentFromDb, setLoading } from './../store';
import { Link } from 'react-router-dom';

const SingleStudent = props => {
  // constructor(props) {
  //   super(props);
  // }

  useEffect(() => {
    const {
      params: { studentId },
    } = props.match;
    props.setLoading(true);
    props.getStudent(studentId);
  }, []);

  const renderCampusLink = student => {
    // return student.campus ? (
    const link = student.campus ? (
      <Link to={`/campuses/${student.campus.id}`}>
        {' '}
        {student.campus ? student.campus.name : 'None'}
      </Link>
    ) : (
      'None'
    );
    return <p>School: {link}</p>;
    // ) : (
    // <p>None</p>
    // );
  };

  return props.isLoading ? (
    <div uk-spinner="true" />
  ) : (
    <div className="uk-child-width-1-2">
      <img src={props.currentStudent.imageUrl} alt="student image" />
      <p>Firstname: {props.currentStudent.firstName}</p>
      <p>Lastname: {props.currentStudent.lastName}</p>
      <p>Email: {props.currentStudent.email}</p>
      <p>GPA: {props.currentStudent.gpa}</p>
      {renderCampusLink(props.currentStudent)}
    </div>
  );
};

const mapState = state => ({
  currentStudent: state.currentStudent,
  isLoading: state.isLoading,
});

const mapDispatch = dispatch => ({
  getStudent: studentId => {
    dispatch(getCurrentStudentFromDb(studentId));
  },
  setLoading: loadStatus => {
    dispatch(setLoading(loadStatus));
  },
});

export default connect(
  mapState,
  mapDispatch
)(SingleStudent);
