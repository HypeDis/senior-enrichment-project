const campusValidator = data => {
  let isValid = true;
  const errors = {};

  if (!data.name) {
    errors.name = 'Enter a name';
  }
  // address

  if (!data.address) {
    errors.address = 'Enter an address';
  }

  if (Object.keys(errors).length) {
    isValid = false;
  }

  return [errors, isValid];
};

export default campusValidator;
