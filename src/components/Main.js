import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getStudentsFromDb, getCampusesFromDb } from './../store';

import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import CampusForm from './CampusForm';
import StudentForm from './StudentForm';
import NotFound from './NotFound';

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
      <div className="uk-container-expand">
        <Navbar />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Redirect to={'/campuses'} />}
            />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/campuses/new" component={CampusForm} />
            <Route exact path="/campuses/update" component={CampusForm} />
            <Route exact path="/students/new" component={StudentForm} />
            <Route exact path="/students/update" component={StudentForm} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route path="/notfound" component={NotFound} />
            <Redirect to="/notfound" />
          </Switch>
        </main>
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
