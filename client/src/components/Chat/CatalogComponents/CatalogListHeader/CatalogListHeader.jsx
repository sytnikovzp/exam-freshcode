import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import Schems from '../../../../utils/validators/validationSchems';

import {
  changeCatalogName,
  changeRenameCatalogMode,
  changeShowModeCatalog,
} from '../../../../store/slices/chatSlice';

import FormInput from '../../../FormInput/FormInput';

import styles from './CatalogHeader.module.sass';

function CatalogListHeader(props) {
  const changeCatalogName = (values) => {
    const { changeCatalogName, _id } = props;
    changeCatalogName({ catalogName: values.catalogName, catalogId: _id });
  };
  const {
    catalogName,
    changeShowModeCatalog,
    changeRenameCatalogMode,
    isRenameCatalog,
  } = props;
  return (
    <div className={styles.headerContainer}>
      <i
        className='fas fa-long-arrow-alt-left'
        onClick={() => changeShowModeCatalog()}
      />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i
            className='fas fa-edit'
            onClick={() => changeRenameCatalogMode()}
          />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik
            initialValues={props.initialValues}
            validationSchema={Schems.CatalogSchema}
            onSubmit={changeCatalogName}
          >
            <Form>
              <FormInput
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                label='Catalog Name'
                name='catalogName'
                type='text'
              />
              <button type='submit'>Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isRenameCatalog } = state.chatStore;
  const { catalogName, _id } = state.chatStore.currentCatalog;
  return {
    _id,
    catalogName,
    isRenameCatalog,
    initialValues: {
      catalogName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  changeRenameCatalogMode: () => dispatch(changeRenameCatalogMode()),
  changeCatalogName: (data) => dispatch(changeCatalogName(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListHeader);
