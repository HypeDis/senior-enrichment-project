import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentStudentFromDb, setLoading } from './../store';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';

const SingleStudent = props => {
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
      <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link>
    ) : (
      'None'
    );
    return <p>School: {link}</p>;
  };

  return props.isLoading ? (
    <Loading />
  ) : props.currentStudentError.error ? (
    <Redirect to="/notfound" />
  ) : (
    <div className="single-item-container">
      <img src={props.currentStudent.imageUrl} alt="student image" />
      <p>Firstname: {props.currentStudent.firstName}</p>
      <p>Lastname: {props.currentStudent.lastName}</p>
      <p>Email: {props.currentStudent.email}</p>
      <p>GPA: {props.currentStudent.gpa}</p>
      {renderCampusLink(props.currentStudent)}
      <Link to="/students/update">
        <button className="uk-button uk-button-default">Update Info</button>
      </Link>
    </div>
  );
};

const mapState = state => ({
  currentStudent: state.currentStudent,
  isLoading: state.isLoading,
  currentStudentError: state.currentStudentError,
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
