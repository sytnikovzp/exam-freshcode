import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import CONSTANTS from '../../../../constants';
import Schems from '../../../../utils/validators/validationSchems';

import { sendMessage } from '../../../../store/slices/chatSlice';

import FormInput from '../../../FormInput/FormInput';

import styles from './ChatInput.module.sass';

function ChatInput(props) {
  const submitHandler = (values, { resetForm }) => {
    props.sendMessage({
      messageBody: values.message,
      recipient: props.interlocutor.id,
      interlocutor: props.interlocutor,
    });
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={Schems.MessageSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.form}>
          <FormInput
            classes={{
              container: styles.container,
              input: styles.input,
              notValid: styles.notValid,
            }}
            label='message'
            name='message'
            type='text'
          />
          <button type='submit'>
            <img
              alt='send Message'
              src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`}
            />
          </button>
        </Form>
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { interlocutor } = state.chatStore;
  const { data } = state.userStore;
  return { interlocutor, data };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (data) => dispatch(sendMessage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
