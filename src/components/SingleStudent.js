import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentStudentFromDb } from './../store';
import { Link } from 'react-router-dom';

class SingleStudent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const {
      params: { studentId },
    } = this.props.match;

    this.props.getStudent(studentId);
  }

  componentWillUnmount() {
    // clear the currentStudent from the store
  }

  renderCampusLink(student) {
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
  }

  render() {
    const { currentStudent } = this.props;
    return (
      <div className="uk-child-width-1-2">
        <img src={currentStudent.imageUrl} alt="student image" />
        <p>Firstname: {currentStudent.firstName}</p>
        <p>Lastname: {currentStudent.lastName}</p>
        <p>Email: {currentStudent.email}</p>
        <p>GPA: {currentStudent.gpa}</p>
        {this.renderCampusLink(currentStudent)}
      </div>
    );
  }
}
const mapState = state => ({
  currentStudent: state.currentStudent,
});

const mapDispatch = dispatch => ({
  getStudent: studentId => {
    dispatch(getCurrentStudentFromDb(studentId));
  },
});

export default connect(
  mapState,
  mapDispatch
)(SingleStudent);
