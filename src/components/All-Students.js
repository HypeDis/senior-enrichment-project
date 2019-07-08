import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { resetCurrentStudent } from './../store';
import { GRID, CARD } from './../styles';
const AllStudents = props => {
  props.resetStudent();
  return (
    <div className="uk-container-small">
      <ul className={GRID} uk-grid="true">
        {props.students.map(student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>
              <div className={CARD}>
                <div className="card-info">
                  <img src={student.imageUrl} alt="student image" />
                  <div>{`${student.firstName} ${student.lastName}`}</div>
                </div>
                <div>
                  <DeleteButton location={props.location} id={student.id} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <button className="uk-button">
        <Link to="/students/new">Add Student </Link>
      </button>
    </div>
  );
};

const mapState = state => ({
  students: state.students,
});
const mapDispatch = dispatch => ({
  resetStudent: () => {
    dispatch(resetCurrentStudent());
  },
});
export default connect(
  mapState,
  mapDispatch
)(AllStudents);
