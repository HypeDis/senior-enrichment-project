import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetCurrentCampus } from './../store';

const AllCampuses = props => {
  props.resetCampus();
  return (
    <div>
      {props.campuses.map(campus => (
        <li key={campus.id}>
          <Link to={`/campuses/${campus.id}`}>
            <img
              src={campus.imageUrl}
              alt="campus image"
              height="50"
              width="50"
            />
          </Link>
          <p>{campus.name}</p>
        </li>
      ))}
      <div>
        <Link to="/campuses/new">Add Campus</Link>
      </div>
    </div>
  );
};

const mapState = state => ({
  campuses: state.campuses,
});

const mapDispatch = dispatch => ({
  resetCampus: () => {
    dispatch(resetCurrentCampus());
  },
});

export default connect(
  mapState,
  mapDispatch
)(AllCampuses);
