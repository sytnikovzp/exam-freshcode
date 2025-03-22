import { useLayoutEffect } from 'react';
import { ErrorMessage, Field } from 'formik';

function SelectInput({ header, classes, optionsArray, valueArray, ...props }) {
  const {
    form: { setFieldValue },
    meta: { initialValue },
    field,
  } = props;

  const getOptionsArray = () => {
    const array = [];
    for (let i = 0; optionsArray && i < optionsArray.length; i++) {
      let option = null;
      if (valueArray) {
        option = (
          <option key={i} value={valueArray[i]}>
            {optionsArray[i]}
          </option>
        );
      } else {
        option = <option key={i}>{optionsArray[i]}</option>;
      }
      array.push(option);
    }
    return array;
  };

  useLayoutEffect(() => {
    if (!initialValue && optionsArray) {
      setFieldValue(field.name, valueArray ? valueArray[0] : optionsArray[0]);
    }
  }, [field.name, initialValue, optionsArray, setFieldValue, valueArray]);

  return (
    <div className={classes.inputContainer}>
      <span className={classes.inputHeader}>{header}</span>
      <select {...field} className={classes.selectInput}>
        {getOptionsArray()}
      </select>
    </div>
  );
}

function SelectInputWrapper({
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) {
  return (
    <Field {...rest}>
      {(fieldProps) => (
        <>
          <SelectInput
            {...fieldProps}
            classes={classes}
            header={header}
            optionsArray={optionsArray}
            valueArray={valueArray}
          />
          <ErrorMessage
            className={classes.warning}
            component='span'
            name={fieldProps.field.name}
          />
        </>
      )}
    </Field>
  );
}

export default SelectInputWrapper;
