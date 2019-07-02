import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getStudentsFromDb, getCampusesFromDb } from './../store';

import Navbar from './Navbar';
import AllCampuses from './All-Campuses';
import AllStudents from './All-Students';
import SingleCampus from './SingleCampus';

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.getCampuses();
    this.props.getStudents();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Redirect to="/campuses" />
        </Switch>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getCampuses: () => {
    dispatch(getCampusesFromDb());
  },
  getStudents: () => {
    dispatch(getStudentsFromDb());
  },
});

export default connect(
  null,
  mapDispatch
)(Main);
