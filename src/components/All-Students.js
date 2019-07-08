import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { resetCurrentStudent, setLoading, getStudentsFromDb } from './../store';
import { GRID, CARD } from './../styles';
import Loading from './Loading';
const AllStudents = props => {
  useEffect(() => {
    props.resetStudent();
    props.setLoading(true);
    props.getStudentsFromDb();
  }, []);

  return props.isLoading ? (
    <Loading />
  ) : (
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
  isLoading: state.isLoading,
});
const mapDispatch = dispatch => ({
  resetStudent: () => {
    dispatch(resetCurrentStudent());
  },
  setLoading: loadStatus => {
    dispatch(setLoading(loadStatus));
  },
  getStudentsFromDb: () => {
    dispatch(getStudentsFromDb());
  },
});
export default connect(
  mapState,
  mapDispatch
)(AllStudents);
