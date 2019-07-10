import React from 'react';
import renderErrorMsg from './renderErrorMsg';

export default (name, value, handleChange, values, errors) => {
  return (
    <div className="field">
      <label>{name}</label>
      <div>
        <input
          type="text"
          value={values[value]}
          name={value}
          onChange={handleChange}
          className="uk-input"
        />
        {renderErrorMsg(value, errors)}
      </div>
    </div>
  );
};
