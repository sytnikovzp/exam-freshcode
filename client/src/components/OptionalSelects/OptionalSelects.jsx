import CONSTANTS from '../../constants';

import styles from '../ContestForm/ContestForm.module.sass';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import Spinner from '../Spinner/Spinner';

function OptionalSelects(props) {
  if (props.isFetching) {
    return <Spinner />;
  }
  switch (props.contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <SelectInput
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header='type of company'
            name='typeOfName'
            optionsArray={props.dataForContest.data.typeOfName}
          />
          <SelectInput
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header='Style name'
            name='styleName'
            optionsArray={props.dataForContest.data.nameStyle}
          />
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
              label='name of venture'
              name='nameVenture'
              type='text'
            />
          </div>
          <SelectInput
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header='Brand Style'
            name='brandStyle'
            optionsArray={props.dataForContest.data.brandStyle}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
              label='name of venture'
              name='nameVenture'
              type='text'
            />
          </div>
          <SelectInput
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header='Type tagline'
            name='typeOfTagline'
            optionsArray={props.dataForContest.data.typeOfTagline}
          />
        </>
      );
    }
  }
}

export default OptionalSelects;
