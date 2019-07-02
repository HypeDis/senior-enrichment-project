import React from 'react';
import { NavLink } from 'react-router-dom';
const NavBar = props => {
  return (
    <div>
      <NavLink to="/campuses">Campuses</NavLink>
      <NavLink to="/students">Students</NavLink>
    </div>
  );
};

export default NavBar;
