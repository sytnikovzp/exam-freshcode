import { Field } from 'formik';

function FieldFileInput({ classes, ...rest }) {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {(props) => {
        const { field } = props;

        const getFileName = () => {
          if (props.field.value) {
            return props.field.value.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <label className={labelClass} htmlFor='fileInput'>
              Choose file
            </label>
            <span className={fileNameClass} id='fileNameContainer'>
              {getFileName()}
            </span>
            <input
              {...field}
              className={fileInput}
              id='fileInput'
              type='file'
            />
          </div>
        );
      }}
    </Field>
  );
}

export default FieldFileInput;
