// firstName , lastName, email, gpa

export default data => {
  const errors = {};
  let isValid = true;

  if (!data.firstName) {
    errors.firstName = 'Put in a first name';
  }
  if (!data.lastName) {
    errors.lastName = 'Put in a last name';
  }

  if (!data.email) {
    errors.email = 'Email cant be empty';
  }

  let { gpa } = data;
  if (gpa) {
    const gpaIsNaN = isNaN(gpa);
    if (gpaIsNaN) {
      errors.gpa = 'GPA must be a number';
    } else {
      const gpaFloat = parseFloat(gpa);
      if (gpaFloat < 0 || gpaFloat > 4) {
        errors.gpa = 'GPA must be between 0.0 and 4.0';
      }
    }
  }
  if (Object.keys(errors).length) {
    isValid = false;
  }
  return [errors, isValid];
};
