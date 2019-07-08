import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getStudentsFromDb, getCampusesFromDb } from './../store';

import Navbar from './Navbar';
import AllCampuses from './All-Campuses';
import AllStudents from './All-Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import CampusForm from './CampusForm';
import StudentForm from './StudentForm';

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.setLoading(true);
    // this.props.getCampuses();
    // this.props.getStudents();
  }
  render() {
    return (
      <div className="uk-container">
        <Navbar />
        <Switch>
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/campuses/new" component={CampusForm} />
          <Route exact path="/campuses/update" component={CampusForm} />
          <Route path="/students/new" component={StudentForm} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Route path="/students/:studentId" component={SingleStudent} />
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
  setLoading: loadStatus => {
    dispatch(setLoading(loadStatus));
  },
});

export default connect(
  null,
  mapDispatch
)(Main);
