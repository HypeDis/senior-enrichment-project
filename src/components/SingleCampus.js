import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentCampusFromDb } from './../store';

class SingleCampus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      params: { campusId },
    } = this.props.match;

    this.props.getCampus(campusId);
    // console.log(this.props.currentCampus);
  }

  render() {
    const {
      params: { campusId },
    } = this.props.match;
    return (
      <div>
        <h1>Single Campus {campusId}</h1>
      </div>
    );
  }
}

const mapState = state => ({
  currentCampus: state.currentCampus,
});

const mapDispatch = dispatch => ({
  getCampus: campusId => {
    dispatch(getCurrentCampusFromDb(campusId));
  },
});

export default connect(
  mapState,
  mapDispatch
)(SingleCampus);
