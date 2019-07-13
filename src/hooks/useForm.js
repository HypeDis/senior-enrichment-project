import { useState } from 'react';

const useForm = (callback, initialState = {}, validate, isNew, setErrors) => {
  // reusable state and handle sumbit/change for form inputs
  const [values, setValues] = useState(initialState);

  const handleChange = evt => {
    evt.persist();
    setValues(vals => ({ ...vals, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = evt => {
    if (evt) {
      evt.preventDefault();
    }
    const id = initialState.id;
    callback(validate, values, isNew, id, setErrors);
  };

  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
  };
};

export default useForm;
