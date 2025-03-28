import { CONTEST_TYPES } from '../../constants';

import styles from '../ContestForm/ContestForm.module.sass';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';

function OptionalSelects(props) {
  if (props.isFetching) {
    return <SpinnerLoader />;
  }
  switch (props.contestType) {
    case CONTEST_TYPES.NAME: {
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
    case CONTEST_TYPES.LOGO: {
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
    case CONTEST_TYPES.TAGLINE: {
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
