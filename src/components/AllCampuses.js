import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetCurrentCampus, setLoading, getCampusesFromDb } from '../store';
import DeleteButton from './DeleteButton';
import { GRID, CARD } from '../styles';
import Loading from './Loading';

const AllCampuses = props => {
  useEffect(() => {
    props.resetCampus();
    if (!props.campuses.length) {
      props.setLoading(true);
      props.getCampusesFromDb();
    }
  }, []);
  return props.isLoading ? (
    <Loading />
  ) : (
    <div className="uk-container-expand all-items-container">
      <div className="scroll-container">
        <ul className={GRID} uk-grid="true">
          {props.campuses.map(campus => (
            <li key={campus.id}>
              <Link to={`/campuses/${campus.id}`} className="uk-thumbnail">
                <div className={CARD}>
                  <div className="card-details">
                    <img
                      src={campus.imageUrl}
                      className="card-img"
                      alt="campus image"
                      onError={() => {
                        console.log('image error');
                      }}
                    />
                    <div className="caption">{campus.name}</div>
                  </div>

                  <DeleteButton location={props.location} id={campus.id} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

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
  isLoading: state.isLoading,
});

const mapDispatch = dispatch => ({
  resetCampus: () => {
    dispatch(resetCurrentCampus());
  },
  setLoading: loadStatus => {
    dispatch(setLoading(loadStatus));
  },
  getCampusesFromDb: () => {
    dispatch(getCampusesFromDb());
  },
});

export default connect(
  mapState,
  mapDispatch
)(AllCampuses);
