import { Field } from 'formik';

function AgreeTermOfServiceInput({ classes, id, type, label, ...rest }) {
  return (
    <Field {...rest}>
      {({ field, meta }) => (
        <div>
          <div className={classes.container}>
            <input {...field} id={id} placeholder={label} type={type} />
            <label htmlFor={id}>
              By clicking this checkbox, you agree to our
              <a href='#' rel='noreferrer' target='_blank'>
                Terms of Service.
              </a>
            </label>
          </div>
          {meta.touched && meta.error && (
            <span className={classes.warning}>{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
}

export default AgreeTermOfServiceInput;
