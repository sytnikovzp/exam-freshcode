import { ErrorMessage, Field } from 'formik';
import classNames from 'classnames';

function FormTextArea({ label, classes, ...rest }) {
  return (
    <Field {...rest}>
      {(props) => {
        const {
          field,
          meta: { touched, error },
        } = props;
        const { container, inputStyle, notValid, warning } = classes;
        return (
          <div className={container}>
            <textarea
              {...field}
              className={classNames(inputStyle, {
                [notValid]: touched && error,
              })}
              placeholder={label}
            />
            <ErrorMessage
              className={warning}
              component='span'
              name={field.name}
            />
          </div>
        );
      }}
    </Field>
  );
}

export default FormTextArea;
