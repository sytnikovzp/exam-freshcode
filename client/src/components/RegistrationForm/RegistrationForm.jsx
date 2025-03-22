import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { AUTH_MODES, USER_ROLES } from '../../constants';
import Schems from '../../utils/validators/validationSchems';

import {
  checkAuth,
  clearAuth,
  clearAuthError,
} from '../../store/slices/authSlice';

import AgreeTermOfServiceInput from '../AgreeTermOfServiceInput/AgreeTermOfServiceInput';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import RoleInput from '../RoleInput/RoleInput';

import styles from './RegistrationForm.module.sass';

const initialValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: USER_ROLES.CUSTOMER,
  agreeOfTerms: false,
};

function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(
    () => () => {
      dispatch(clearAuth());
      dispatch(clearAuthError());
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (values) => {
      dispatch(
        checkAuth({
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            displayName: values.displayName,
            email: values.email,
            password: values.password,
            role: values.role,
          },
          navigate,
          authMode: AUTH_MODES.REGISTER,
        })
      );
    },
    [dispatch, navigate]
  );

  const clearError = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  const { error, isFetching } = auth;

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.signUpFormContainer}>
      {error && (
        <Error
          clearError={clearError}
          data={error.data}
          status={error.status}
        />
      )}
      <div className={styles.headerFormContainer}>
        <h2>CREATE AN ACCOUNT</h2>
        <h4>We always keep your name and email address private.</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schems.RegistrationSchem}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={styles.row}>
            <FormInput
              classes={formInputClasses}
              label='First name'
              name='firstName'
              type='text'
            />
            <FormInput
              classes={formInputClasses}
              label='Last name'
              name='lastName'
              type='text'
            />
          </div>
          <div className={styles.row}>
            <FormInput
              classes={formInputClasses}
              label='Display Name'
              name='displayName'
              type='text'
            />
            <FormInput
              classes={formInputClasses}
              label='Email Address'
              name='email'
              type='text'
            />
          </div>
          <div className={styles.row}>
            <FormInput
              classes={formInputClasses}
              label='Password'
              name='password'
              type='password'
            />
            <FormInput
              classes={formInputClasses}
              label='Password confirmation'
              name='confirmPassword'
              type='password'
            />
          </div>
          <div className={styles.choseRoleContainer}>
            <Field
              component={RoleInput}
              id={USER_ROLES.CUSTOMER}
              infoRole='I am looking for a Name, Logo or Tagline for my business, brand or product.'
              name='role'
              strRole='Join As a Buyer'
              type='radio'
              value={USER_ROLES.CUSTOMER}
            />
            <Field
              component={RoleInput}
              id={USER_ROLES.CREATOR}
              infoRole='I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.'
              name='role'
              strRole='Join As a Creative'
              type='radio'
              value={USER_ROLES.CREATOR}
            />
          </div>
          <div className={styles.termsOfService}>
            <AgreeTermOfServiceInput
              classes={{
                container: styles.termsOfService,
                warning: styles.fieldWarning,
              }}
              id='termsOfService'
              name='agreeOfTerms'
              type='checkbox'
            />
          </div>
          <button
            className={styles.submitContainer}
            disabled={isFetching}
            type='submit'
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'CREATE ACCOUNT'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationForm;
