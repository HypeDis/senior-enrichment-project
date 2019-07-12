import React from 'react';
import renderInput from './renderInput';
import renderTitle from './renderTitle';
import renderTextArea from './renderTextArea';
import renderSelect from './renderSelect';

const renderFormComponents = (inputs, isNew, handleChange, values, errors) => {
  return inputs.map((input, idx) => {
    switch (input.type) {
      case 'title':
        return (
          <div key={`renderForm_${idx}`}>{renderTitle(input.name, isNew)}</div>
        );
      case 'input':
        return (
          <div key={`renderForm_${idx}`}>
            {renderInput(input.name, input.value, handleChange, values, errors)}
          </div>
        );
      case 'textArea':
        return (
          <div key={`renderForm_${idx}`}>
            {renderTextArea(input.name, input.value, handleChange, values)}
          </div>
        );
      case 'select':
        return (
          <div key={`renderForm_${idx}`}>
            {renderSelect(
              input.name,
              input.value,
              handleChange,
              values,
              input.selections,
              input.optionKey
            )}
          </div>
        );
      default:
        throw new Error('input type not found:', input.type);
    }
  });
};

export default renderFormComponents;
