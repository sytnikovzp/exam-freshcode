import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import Schems from '../../../../utils/validators/validationSchems';

import { createCatalog } from '../../../../store/slices/chatSlice';

import FormInput from '../../../FormInput/FormInput';

import styles from './CreateCatalog.module.sass';

function CreateCatalog(props) {
  const click = (values) => {
    const { createCatalog } = props;
    const { addChatId } = props;
    createCatalog({ catalogName: values.catalogName, chatId: addChatId });
  };
  return (
    <Formik
      initialValues={{ catalogName: '' }}
      validationSchema={Schems.CatalogSchema}
      onSubmit={click}
    >
      <Form className={styles.form}>
        <FormInput
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.fieldWarning,
            notValid: styles.notValid,
          }}
          label='name of catalog'
          name='catalogName'
          type='text'
        />
        <button type='submit'>Create Catalog</button>
      </Form>
    </Formik>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createCatalog: (data) => dispatch(createCatalog(data)),
});

const mapStateToProps = (state) => state.chatStore;

export default connect(mapStateToProps, mapDispatchToProps)(CreateCatalog);
