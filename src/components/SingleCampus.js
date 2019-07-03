import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentCampusFromDb } from './../store';

class SingleCampus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      params: { campusId },
    } = this.props.match;

    this.props.getCampus(campusId);
  }

  renderStudents(students) {
    return students.length ? (
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>
              {`${student.firstName} ${student.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>Nobody wants to go here</p>
    );
  }

  render() {
    const { currentCampus } = this.props;
    return (
      <div>
        <img src={currentCampus.imageUrl} alt="campus image" />
        <p>Name: {currentCampus.name}</p>
        <p>Address: {currentCampus.address}</p>
        <p>Description: {currentCampus.description}</p>
        <h3>Students:</h3>
        {this.renderStudents(currentCampus.students)}
      </div>
    );
  }
}
const mapState = state => ({
  currentCampus: state.currentCampus,
});

const mapDispatch = dispatch => ({
  getCampus: campusId => {
    dispatch(getCurrentCampusFromDb(campusId));
  },
});

export default connect(
  mapState,
  mapDispatch
)(SingleCampus);
