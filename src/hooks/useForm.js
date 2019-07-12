import { useState } from 'react';

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const hookCallback = callback.bind(null, values);

  const handleChange = evt => {
    evt.persist();
    setValues(values => ({ ...values, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = evt => {
    if (evt) {
      evt.preventDefault();
    }
    hookCallback();
  };

  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
  };
};

export default useForm;
