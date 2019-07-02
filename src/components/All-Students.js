import React from 'react';
import { connect } from 'react-redux';
const AllStudents = props => {
  return (
    <div>
      <ul>
        {props.students.map(student => (
          <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
        ))}
      </ul>
    </div>
  );
};

const mapState = state => ({
  students: state.students,
});

export default connect(mapState)(AllStudents);
