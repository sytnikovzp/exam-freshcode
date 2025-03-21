const validator = (schema) => (values) => {
  const errors = {};
  try {
    schema.validateSync(values, { abortEarly: false });
    return errors;
  } catch (err) {
    for (const error of err.inner) {
      errors[error.path] = error.message;
    }
    return errors;
  }
};

export default validator;
