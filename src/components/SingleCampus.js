import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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
  ) : props.currentCampusError.error ? (
    <Redirect to="/notfound" />
  ) : (
    <div className="single-item-container">
      <img src={props.currentCampus.imageUrl} alt="campus image" />
      <p>
        <strong>Name:</strong> {props.currentCampus.name}
      </p>
      <p>
        <strong>Address:</strong> {props.currentCampus.address}
      </p>
      <p>
        <strong>Description: </strong> {props.currentCampus.description}
      </p>

      <Link to="/campuses/update">
        <button className="uk-button uk-button-default">Update Info</button>
      </Link>
      <p style={{ marginBotton: '0' }}>
        <strong>Students:</strong>
      </p>
      {renderStudents(props.currentCampus.students)}
    </div>
  );
};

const mapState = state => ({
  currentCampus: state.currentCampus,
  isLoading: state.isLoading,
  currentCampusError: state.currentCampusError,
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
