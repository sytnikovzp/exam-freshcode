import { Field } from 'formik';

function AgreeTermOfServiceInput({ id, type, classes, label, ...rest }) {
  return (
    <Field {...rest}>
      {(props) => {
        const {
          meta: { touched, error },
          field,
        } = props;

        return (
          <div>
            <div className={classes.container}>
              <input {...field} id={id} placeholder={label} type={type} />
              <label htmlFor={id}>
                By clicking this checkbox, you agree to our{' '}
                <a
                  href='https://www.google.com'
                  rel='noreferrer'
                  target='_blank'
                >
                  Terms of Service.
                </a>
              </label>
            </div>
            {touched && error && (
              <span className={classes.warning}>{error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
}

export default AgreeTermOfServiceInput;
