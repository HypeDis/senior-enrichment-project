import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetCurrentCampus } from './../store';
import DeleteButton from './DeleteButton';
import { GRID, CARD } from './../styles';

const AllCampuses = props => {
  props.resetCampus();
  return (
    <div className="uk-container-small">
      <ul className={GRID} uk-grid="true">
        {props.campuses.map(campus => (
          <li key={campus.id}>
            <Link to={`/campuses/${campus.id}`} className="uk-thumbnail">
              <div className={CARD}>
                <div className="card-info">
                  <img src={campus.imageUrl} alt="campus image" />
                  <div className="uk-card-footer">{campus.name}</div>
                </div>

                <DeleteButton location={props.location} id={campus.id} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Link to="/campuses/new">
          <button className="uk-button">Add Campus</button>
        </Link>
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
