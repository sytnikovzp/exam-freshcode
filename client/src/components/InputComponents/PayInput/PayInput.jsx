import InputMask from 'react-input-mask';
import { useField } from 'formik';
import classNames from 'classnames';

function PayInput(props) {
  const { label, changeFocus, classes, isInputMask, mask } = props;
  const [field, meta, helpers] = useField(props.name);
  const { touched, error } = meta;

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...field}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          placeholder={label}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          placeholder={label}
          onFocus={() => changeFocus(field.name)}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...field}
        className={classNames(classes.input, {
          [classes.notValid]: touched && error,
        })}
        placeholder={label}
        onFocus={() => changeFocus(field.name)}
      />
      {touched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
}

export default PayInput;
