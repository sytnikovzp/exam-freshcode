import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveContestToStore } from '../../store/slices/contestCreationSlice';

import BackButton from '../../components/BackButton/BackButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import NextButton from '../../components/NextButton/NextButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import styles from './ContestCreationPage.module.sass';

function ContestCreationPage(props) {
  const formRef = useRef();
  const navigate = useNavigate();

  const contestData = props.contestCreationStore.contests[props.contestType]
    ? props.contestCreationStore.contests[props.contestType]
    : { contestType: props.contestType };

  const handleSubmit = (values) => {
    props.saveContest({ type: props.contestType, info: values });
    const route =
      props.bundleStore.bundle[props.contestType] === 'payment'
        ? '/payment'
        : `/startContest/${props.bundleStore.bundle[props.contestType]}Contest`;
    navigate(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !props.bundleStore.bundle && navigate('/startContest', { replace: true });

  return (
    <div>
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{props.title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={props.contestType}
            defaultData={contestData}
            formRef={formRef}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { contestCreationStore, bundleStore } = state;
  return { contestCreationStore, bundleStore };
};

const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestCreationPage);
