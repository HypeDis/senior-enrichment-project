import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
const AllStudents = props => {
  return (
    <div>
      <ul>
        {props.students.map(student => (
          <li key={student.id}>
            <div>
              <Link to={`/students/${student.id}`}>
                {`${student.firstName} ${student.lastName}`}
              </Link>
              <span>
                <DeleteButton location={props.location} id={student.id} />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/students/new">Add New Student</Link>
    </div>
  );
};

const mapState = state => ({
  students: state.students,
});

export default connect(mapState)(AllStudents);
