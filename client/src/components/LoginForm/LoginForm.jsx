import React from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import CONSTANTS from '../../constants';
import Schems from '../../utils/validators/validationSchems';

import { checkAuth, clearAuth } from '../../store/slices/authSlice';

import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';

import styles from './LoginForm.module.sass';

class LoginForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.loginRequest({ data: values, navigate: this.props.navigate });
  };

  render() {
    const { error, isFetching } = this.props.auth;
    const { submitting, authClear } = this.props;

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
            clearError={authClear}
            data={error.data}
            status={error.status}
          />
        )}
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Schems.LoginSchem}
          onSubmit={this.clicked}
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
              disabled={submitting}
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
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: ({ data, navigate }) =>
    dispatch(
      checkAuth({ data, navigate, authMode: CONSTANTS.AUTH_MODE.LOGIN })
    ),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
