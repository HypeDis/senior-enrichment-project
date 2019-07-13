import { useState } from 'react';

const useValidation = validator => {
  // error state/validation hook
  const [errors, setErrors] = useState({});

  const validateInputs = inputs => {
    const [errorsObj, isValid] = validator(inputs);
    console.log('useValidation errors', errorsObj);
    setErrors(errorsObj);
    return isValid;
  };
  return { errors, validateInputs, setErrors };
};
export default useValidation;
