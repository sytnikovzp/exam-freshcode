import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import { CONTEST_TYPES } from '../../constants';
import Schems from '../../utils/validators/validationSchems';

import {
  addOffer,
  clearAddOfferError,
} from '../../store/slices/contestByIdSlice';

import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';

import styles from './OfferForm.module.sass';

function OfferForm(props) {
  const renderOfferInput = () => {
    if (props.contestType === CONTEST_TYPES.LOGO) {
      return (
        <ImageUpload
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
          name='offerData'
        />
      );
    }
    return (
      <FormInput
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        label='your suggestion'
        name='offerData'
        type='text'
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    props.clearOfferError();
    const data = new FormData();
    const { contestId, contestType, customerId } = props;
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    props.setNewOffer(data);
    resetForm();
  };

  const { valid, addOfferError, clearOfferError } = props;
  const validationSchema =
    props.contestType === CONTEST_TYPES.LOGO
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          clearError={clearOfferError}
          data={addOfferError.data}
          status={addOfferError.status}
        />
      )}
      <Formik
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
        onSubmit={setOffer}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {valid && (
            <button className={styles.btnOffer} type='submit'>
              Send Offer
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setNewOffer: (data) => dispatch(addOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

const mapStateToProps = (state) => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
