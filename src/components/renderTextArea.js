import React from 'react';

export default (name, value, handleChange, values) => {
  return (
    <div className="field">
      <label>{name}</label>
      <div>
        <textarea
          type="text"
          name={value}
          value={values[value]}
          onChange={handleChange}
          className="uk-textarea"
        />
      </div>
    </div>
  );
};
