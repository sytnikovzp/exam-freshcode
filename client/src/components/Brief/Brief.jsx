import { connect } from 'react-redux';

import { changeEditContest } from '../../store/slices/contestByIdSlice';
import {
  clearContestUpdationStore,
  updateContest,
} from '../../store/slices/contestUpdationSlice';

import withRouter from '../../hocs/withRouter';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import ContestForm from '../ContestForm/ContestForm';
import Error from '../Error/Error';

import styles from './Brief.module.sass';

function Brief(props) {
  const setNewContestData = (values) => {
    const data = new FormData();
    for (const key of Object.keys(values)) {
      if (key !== 'file' && values[key]) {
        data.append(key, values[key]);
      }
    }
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', props.contestData.id);
    props.update(data);
  };

  const getContestObjInfo = () => {
    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = props.contestData;
    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };
    const defaultData = {};
    for (const key of Object.keys(data)) {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    }
    return defaultData;
  };

  const {
    isEditContest,
    contestData,
    changeEditContest,
    role,
    goChat,
    clearContestUpdationStore,
  } = props;
  const { error } = props.contestUpdationStore;
  const { id } = props.userStore.data;
  if (!isEditContest) {
    return (
      <ContestInfo
        changeEditContest={changeEditContest}
        contestData={contestData}
        goChat={goChat}
        role={role}
        userId={id}
      />
    );
  }
  return (
    <div className={styles.contestForm}>
      {error && (
        <Error
          clearError={clearContestUpdationStore}
          data={error.data}
          status={error.status}
        />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isEditContest } = state.contestByIdStore;
  const { contestUpdationStore, userStore } = state;
  return { contestUpdationStore, userStore, isEditContest };
};

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(updateContest(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  clearContestUpdationStore: () => dispatch(clearContestUpdationStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Brief));
