import Cards from 'react-credit-cards-2';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import Schems from '../../utils/validators/validationSchems';

import { changeFocusOnCard } from '../../store/slices/paymentSlice';

import PayInput from '../InputComponents/PayInput/PayInput';

import styles from './PayForm.module.sass';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

function PayForm(props) {
  const changeFocusOnCard = (name) => {
    props.changeFocusOnCard(name);
  };

  const pay = (values) => {
    props.sendRequest(values);
  };

  const { focusOnElement, isPayForOrder } = props;
  return (
    <div className={styles.payFormContainer}>
      <span className={styles.headerInfo}>Payment Information</span>
      <Formik
        initialValues={{
          focusOnElement: '',
          name: '',
          number: '',
          cvc: '',
          expiry: '',
        }}
        validationSchema={Schems.PaymentSchema}
        onSubmit={pay}
      >
        {({ values }) => {
          const { name, number, expiry, cvc } = values;

          return (
            <>
              <div className={styles.cardContainer}>
                <Cards
                  cvc={cvc || ''}
                  expiry={expiry || ''}
                  focused={focusOnElement}
                  name={name || ''}
                  number={number || ''}
                />
              </div>
              <Form className={styles.formContainer} id='myForm'>
                <div className={styles.bigInput}>
                  <span>Name</span>
                  <PayInput
                    changeFocus={changeFocusOnCard}
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    label='name'
                    name='name'
                    type='text'
                  />
                </div>
                {!isPayForOrder && (
                  <div className={styles.bigInput}>
                    <span>Sum</span>
                    <PayInput
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      label='sum'
                      name='sum'
                      type='text'
                    />
                  </div>
                )}
                <div className={styles.bigInput}>
                  <span>Card Number</span>
                  <PayInput
                    isInputMask
                    changeFocus={changeFocusOnCard}
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    label='card number'
                    mask='9999 9999 9999 9999 999'
                    name='number'
                    type='text'
                  />
                </div>
                <div className={styles.smallInputContainer}>
                  <div className={styles.smallInput}>
                    <span>* Expires</span>
                    <PayInput
                      isInputMask
                      changeFocus={changeFocusOnCard}
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      label='expiry'
                      mask='99/99'
                      name='expiry'
                      type='text'
                    />
                  </div>
                  <div className={styles.smallInput}>
                    <span>* Security Code</span>
                    <PayInput
                      isInputMask
                      changeFocus={changeFocusOnCard}
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      label='cvc'
                      mask='9999'
                      name='cvc'
                      type='text'
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
      {isPayForOrder && (
        <div className={styles.totalSum}>
          <span>Total: $100.00</span>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button className={styles.payButton} form='myForm' type='submit'>
          <span>{isPayForOrder ? 'Pay Now' : 'CashOut'}</span>
        </button>
        {isPayForOrder && (
          <div className={styles.backButton} onClick={() => props.back()}>
            <span>Back</span>
          </div>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeFocusOnCard: (data) => dispatch(changeFocusOnCard(data)),
});

export default connect(null, mapDispatchToProps)(PayForm);
