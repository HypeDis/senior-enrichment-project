import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const NavBar = props => {
  const path = props.location.pathname;
  return (
    <nav className="uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li>
            <NavLink
              exact
              to="/campuses"
              // work-around b/c uk-active not changing font color on load
              style={path === '/campuses' ? { color: '#666' } : {}}
              activeClassName="uk-active, active-nav"
            >
              Campuses
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/students"
              style={path === '/students' ? { color: '#666' } : {}}
              activeClassName="uk-active active-nav"
            >
              Students
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
