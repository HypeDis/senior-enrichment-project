import React from 'react';
import { withRouter } from 'react-router-dom';

import checkNew from '../utils/checkNew';
import { useForm, useValidation } from './../hooks';

// import renderInput from './renderInput';
// import renderTitle from './renderTitle';
// import renderTextArea from './renderTextArea';
// import renderSelect from './renderSelect';
import renderFormComponents from './renderFormComponents';

const Form = props => {
  // template:
  const { inputs, validator, createOrUpdate, currentInfo, location } = props;

  // check if new or update page
  const isNew = checkNew(location);

  const { errors, validateInputs, setErrors } = useValidation(validator);

  // [values] is required in formCreateOrUpdate
  // but defined in the useForm hook
  // const formCreateOrUpdate = createOrUpdate.bind(
  //   null,
  //   validateInputs,
  //   currentInfo.id,
  //   isNew,
  //   setErrors
  //   // values
  // );

  // the useForm hook binds [values] to formCreateOrUpdate internally
  const { handleSubmit, handleChange, values } = useForm(
    createOrUpdate,
    currentInfo,
    validateInputs,
    isNew,
    setErrors
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {renderFormComponents(inputs, isNew, handleChange, values, errors)}
        <div className="field">
          <button className="uk-button uk-button-default" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Form);
