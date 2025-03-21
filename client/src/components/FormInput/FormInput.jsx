import { ErrorMessage, Field } from 'formik';
import classNames from 'classnames';

function FormInput({ classes, label, name, ...rest }) {
  return (
    <Field name={name}>
      {(props) => {
        const {
          field,
          meta: { touched, error },
        } = props;

        const inputClassName = classNames(classes.input, {
          [classes.notValid]: touched && error,
          [classes.valid]: touched && !error,
        });
        return (
          <div className={classes.container}>
            <input
              type='text'
              {...field}
              className={inputClassName}
              placeholder={label}
              {...rest}
            />
            <ErrorMessage
              className={classes.warning}
              component='span'
              name={name}
            />
          </div>
        );
      }}
    </Field>
  );
}

export default FormInput;
