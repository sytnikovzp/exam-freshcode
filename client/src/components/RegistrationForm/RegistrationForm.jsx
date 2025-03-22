import { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import CONSTANTS from '../../constants';
import Schems from '../../utils/validators/validationSchems';

import { checkAuth, clearAuth } from '../../store/slices/authSlice';

import AgreeTermOfServiceInput from '../AgreeTermOfServiceInput/AgreeTermOfServiceInput';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import RoleInput from '../RoleInput/RoleInput';

import styles from './RegistrationForm.module.sass';

class RegistrationForm extends Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.register({
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        role: values.role,
      },
      navigate: this.props.navigate,
    });
  };

  render() {
    const { submitting, auth, authClear } = this.props;
    const { error } = auth;
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
            clearError={authClear}
            data={error.data}
            status={error.status}
          />
        )}
        <div className={styles.headerFormContainer}>
          <h2>CREATE AN ACCOUNT</h2>
          <h4>We always keep your name and email address private.</h4>
        </div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: CONSTANTS.CUSTOMER,
            agreeOfTerms: false,
          }}
          validationSchema={Schems.RegistrationSchem}
          onSubmit={this.clicked}
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
                id={CONSTANTS.CUSTOMER}
                infoRole='I am looking for a Name, Logo or Tagline for my business, brand or product.'
                name='role'
                strRole='Join As a Buyer'
                type='radio'
                value={CONSTANTS.CUSTOMER}
              />
              <Field
                component={RoleInput}
                id={CONSTANTS.CREATOR}
                infoRole='I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.'
                name='role'
                strRole='Join As a Creative'
                type='radio'
                value={CONSTANTS.CREATOR}
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
              disabled={submitting}
              type='submit'
            >
              <span className={styles.inscription}>Create Account</span>
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  initialValues: {
    role: CONSTANTS.CUSTOMER,
  },
});

const mapDispatchToProps = (dispatch) => ({
  register: ({ data, navigate }) =>
    dispatch(
      checkAuth({ data, navigate, authMode: CONSTANTS.AUTH_MODE.REGISTER })
    ),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
