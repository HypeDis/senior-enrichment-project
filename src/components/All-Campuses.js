import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const AllCampuses = props => {
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
    </div>
  );
};

const mapState = state => ({
  campuses: state.campuses,
});

export default connect(mapState)(AllCampuses);
