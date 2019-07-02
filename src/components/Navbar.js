import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = props => {
  return (
    <div>
      <Link to="/campuses">Campuses</Link>
      <Link to="/students">Students</Link>
    </div>
  );
};

export default NavBar;
