import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import Schems from '../../utils/validators/validationSchems';

import { clearUserError } from '../../store/slices/userSlice';

import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';

import styles from './UpdateUserInfoForm.module.sass';

function UpdateUserInfoForm(props) {
  const { onSubmit, submitting, error, clearUserError } = props;
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={Schems.UpdateUserSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            clearError={clearUserError}
            data={error.data}
            status={error.status}
          />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
            label='First Name'
            name='firstName'
            type='text'
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
            label='LastName'
            name='lastName'
            type='text'
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
            label='Display Name'
            name='displayName'
            type='text'
          />
        </div>
        <ImageUpload
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
          name='file'
        />
        <button disabled={submitting} type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  );
}

const mapStateToProps = (state) => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
