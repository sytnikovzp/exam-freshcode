import { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';

import CONSTANTS from '../../constants';
import Schems from '../../utils/validators/validationSchems';

import { getDataForContest } from '../../store/slices/dataForContestSlice';

import withRouter from '../../hocs/withRouter';
import FormInput from '../FormInput/FormInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import OptionalSelects from '../OptionalSelects/OptionalSelects';
import SelectInput from '../SelectInput/SelectInput';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';
import TryAgain from '../TryAgain/TryAgain';

import styles from './ContestForm.module.sass';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

class ContestForm extends Component {
  getPreference = () => {
    const { contestType } = this.props;
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        this.props.getData({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        this.props.getData({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        this.props.getData({ characteristic1: 'brandStyle' });
        break;
      }
    }
  };

  componentDidMount() {
    this.getPreference();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contestType !== this.props.contestType) {
      this.getPreference();
    }
  }

  render() {
    const { isFetching, error } = this.props.dataForContest;
    if (error) {
      return <TryAgain getData={this.getPreference} />;
    }
    if (isFetching) {
      return <SpinnerLoader />;
    }
    return (
      <div className={styles.formContainer}>
        <Formik
          enableReinitialize
          initialValues={{
            title: '',
            industry: '',
            focusOfWork: '',
            targetCustomer: '',
            file: '',
            ...variableOptions[this.props.contestType],
            ...this.props.initialValues,
          }}
          innerRef={this.props.formRef}
          validationSchema={Schems.ContestSchem}
          onSubmit={this.props.handleSubmit}
        >
          <Form>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Title of contest</span>
              <FormInput
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
                label='Title'
                name='title'
                type='text'
              />
            </div>
            <div className={styles.inputContainer}>
              <SelectInput
                classes={{
                  inputContainer: styles.selectInputContainer,
                  inputHeader: styles.selectHeader,
                  selectInput: styles.select,
                  warning: styles.warning,
                }}
                header='Describe industry associated with your venture'
                name='industry'
                optionsArray={this.props.dataForContest.data.industry}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What does your company / business do?
              </span>
              <FormTextArea
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
                label='e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper'
                name='focusOfWork'
                type='text'
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                Tell us about your customers
              </span>
              <FormTextArea
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
                label='customers'
                name='targetCustomer'
                type='text'
              />
            </div>
            <OptionalSelects {...this.props} />
            <FieldFileInput
              classes={{
                fileUploadContainer: styles.fileUploadContainer,
                labelClass: styles.label,
                fileNameClass: styles.fileName,
                fileInput: styles.fileInput,
                warning: styles.warning,
              }}
              name='file'
              type='file'
            />
            {this.props.isEditContest ? (
              <button className={styles.changeData} type='submit'>
                Set Data
              </button>
            ) : null}
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isEditContest } = state.contestByIdStore;
  return {
    isEditContest,
    contestCreationStore: state.contestCreationStore,
    dataForContest: state.dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getDataForContest(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestForm)
);
