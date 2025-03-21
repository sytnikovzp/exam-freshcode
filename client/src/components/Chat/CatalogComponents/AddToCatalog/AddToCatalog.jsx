import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import { addChatToCatalog } from '../../../../store/slices/chatSlice';

import SelectInput from '../../../SelectInput/SelectInput';

import styles from './AddToCatalog.module.sass';

function AddToCatalog(props) {
  const getCatalogsNames = () => {
    const { catalogList } = props;
    const namesArray = [];
    for (const catalog of catalogList) {
      namesArray.push(catalog.catalogName);
    }
    return namesArray;
  };

  const getValueArray = () => {
    const { catalogList } = props;
    const valueArray = [];
    for (const catalog of catalogList) {
      valueArray.push(catalog._id);
    }
    return valueArray;
  };

  const click = (values) => {
    const { addChatId } = props;
    props.addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId });
  };

  const selectArray = getCatalogsNames();
  return (
    <>
      {selectArray.length !== 0 ? (
        <Formik initialValues={{ catalogId: '' }} onSubmit={click}>
          <Form className={styles.form}>
            <SelectInput
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              header='name of catalog'
              name='catalogId'
              optionsArray={selectArray}
              valueArray={getValueArray()}
            />
            <button type='submit'>Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  addChatToCatalog: (data) => dispatch(addChatToCatalog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCatalog);
