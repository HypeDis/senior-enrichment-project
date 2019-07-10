import React from 'react';
export default (value, errors) => {
  return errors[value] ? (
    <div className="error-container">
      <p>{errors[value]}</p>
    </div>
  ) : (
    ''
  );
};
