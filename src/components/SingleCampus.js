import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentCampusFromDb, setLoading } from './../store';
import Loading from './Loading';

const SingleCampus = props => {
  useEffect(() => {
    const {
      params: { campusId },
    } = props.match;
    props.setLoading(true);
    props.getCampus(campusId);
  }, []);

  const renderStudents = students => {
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
  };

  return props.isLoading ? (
    <Loading />
  ) : (
    <div className="single-item-container">
      <img src={props.currentCampus.imageUrl} alt="campus image" />
      <p>
        <em>Name:</em> {props.currentCampus.name}
      </p>
      <p>Address: {props.currentCampus.address}</p>
      <p>Description: {props.currentCampus.description}</p>
      <Link to="/campuses/update">Update Info</Link>
      <h3>Students:</h3>
      {renderStudents(props.currentCampus.students)}
    </div>
  );
};

const mapState = state => ({
  currentCampus: state.currentCampus,
  isLoading: state.isLoading,
});

const mapDispatch = dispatch => ({
  getCampus: campusId => {
    dispatch(getCurrentCampusFromDb(campusId));
  },
  setLoading: loadStatus => {
    dispatch(setLoading(loadStatus));
  },
});

export default connect(
  mapState,
  mapDispatch
)(SingleCampus);
