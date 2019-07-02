import React from 'react';
import { connect } from 'react-redux';
const AllCampuses = props => {
  return (
    <div>
      {props.campuses.map(campus => (
        <li key={campus.id}>
          <img
            src={campus.imageUrl}
            alt="campus image"
            height="50"
            width="50"
          />
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
