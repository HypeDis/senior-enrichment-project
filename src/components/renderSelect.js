import React from 'react';

export default (name, value, handleChange, values, selections, optionKey) => {
  return (
    <div className="field">
      <label>{name}</label>
      <div className="student-select">
        <select name={value} value={values[value]} onChange={handleChange}>
          <option value="">--None--</option>
          {selections.map(selection => (
            <option key={selection.id} value={selection.id}>
              {selection[optionKey]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
