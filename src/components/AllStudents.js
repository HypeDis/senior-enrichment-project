import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { resetCurrentStudent, setLoading, getStudentsFromDb } from '../store';
import { GRID, CARD } from '../styles';
import Loading from './Loading';
const AllStudents = props => {
  useEffect(() => {
    props.resetStudent();
    if (!props.students.length) {
      props.setLoading(true);
      props.getStudentsFromDb();
    }
  }, []);

  return props.isLoading ? (
    <Loading />
  ) : (
    <div className="uk-container-expand all-items-container">
      <div className="scroll-container">
        <ul className={GRID} uk-grid="true">
          {props.students.map(student => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`} className="uk-thumbnail">
                <div className={CARD}>
                  <div className="card-details">
                    <div className="card-img-container">
                      <img
                        src={student.imageUrl}
                        className="card-img"
                        alt="student image"
                      />
                    </div>
                    <div className="caption">{`${student.firstName} ${
                      student.lastName
                    }`}</div>
                  </div>
                  <div>
                    <DeleteButton location={props.location} id={student.id} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/students/new">
        <button className="uk-button uk-button-primary">Add Student</button>
      </Link>
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
