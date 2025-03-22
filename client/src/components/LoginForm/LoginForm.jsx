import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { AUTH_MODES } from '../../constants';
import Schems from '../../utils/validators/validationSchems';

import {
  checkAuth,
  clearAuth,
  clearAuthError,
} from '../../store/slices/authSlice';

import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';

import styles from './LoginForm.module.sass';

const initialValues = {
  email: '',
  password: '',
};

function LoginForm() {
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
            email: values.email,
            password: values.password,
          },
          navigate,
          authMode: AUTH_MODES.LOGIN,
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
    <div className={styles.loginForm}>
      {error && (
        <Error
          clearError={clearError}
          data={error.data}
          status={error.status}
        />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Schems.LoginSchem}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            label='Email Address'
            name='email'
            type='text'
          />
          <FormInput
            classes={formInputClasses}
            label='Password'
            name='password'
            type='password'
          />
          <button
            className={styles.submitContainer}
            disabled={isFetching}
            type='submit'
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
