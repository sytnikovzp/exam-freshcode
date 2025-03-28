import { Component } from 'react';
import LightBox from 'react-18-image-lightbox';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import {
  API_CONFIG,
  CONTEST_STATUS,
  OFFER_STATUS,
  USER_ROLES,
} from '../../constants';

import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  changeContestViewMode,
  changeEditContest,
  changeShowImage,
  clearSetOfferStatusError,
  getContestById,
  setOfferStatus,
} from '../../store/slices/contestByIdSlice';

import Brief from '../../components/Brief/Brief';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import Error from '../../components/Error/Error';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';
import TryAgain from '../../components/TryAgain/TryAgain';

import withRouter from '../../hocs/withRouter';

import styles from './ContestPage.module.sass';

import 'react-18-image-lightbox/style.css';

class ContestPage extends Component {
  componentWillUnmount() {
    this.props.changeEditContest(false);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { id } = this.props.params;
    this.props.getData({ contestId: id });
  };

  setOffersList = () => {
    const array = [];
    for (let i = 0; i < this.props.contestByIdStore.offers.length; i++) {
      array.push(
        <OfferBox
          key={this.props.contestByIdStore.offers[i].id}
          contestType={this.props.contestByIdStore.contestData.contestType}
          data={this.props.contestByIdStore.offers[i]}
          date={new Date()}
          needButtons={this.needButtons}
          setOfferStatus={this.setOfferStatus}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  needButtons = (offerStatus) => {
    const contestCreatorId = this.props.contestByIdStore.contestData.User.id;
    const userId = this.props.userStore.data.id;
    const contestStatus = this.props.contestByIdStore.contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONTEST_STATUS.ACTIVE &&
      offerStatus === OFFER_STATUS.PENDING
    );
  };

  setOfferStatus = (creatorId, offerId, command) => {
    this.props.clearSetOfferStatusError();
    const { id, orderId, priority } = this.props.contestByIdStore.contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    this.props.setOfferStatus(obj);
  };

  findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  goChat = () => {
    const { User } = this.props.contestByIdStore.contestData;
    this.props.goToExpandedDialog({
      interlocutor: User,
      conversationData: this.findConversationInfo(User.id),
    });
  };

  render() {
    const { role } = this.props.userStore.data;
    const {
      contestByIdStore,
      changeShowImage,
      changeContestViewMode,
      getData,
      clearSetOfferStatusError,
    } = this.props;
    const {
      isShowOnFull,
      imagePath,
      error,
      isFetching,
      isBrief,
      contestData,
      offers,
      setOfferStatusError,
    } = contestByIdStore;
    return (
      <div>
        {/* <Chat/> */}
        {isShowOnFull && (
          <LightBox
            mainSrc={`${API_CONFIG.PUBLIC_URL}/${imagePath}`}
            onCloseRequest={() =>
              changeShowImage({ isShowOnFull: false, imagePath: null })
            }
          />
        )}
        {error ? (
          <div className={styles.tryContainer}>
            <TryAgain getData={getData} />
          </div>
        ) : isFetching ? (
          <div className={styles.containerSpinner}>
            <SpinnerLoader />
          </div>
        ) : (
          <div className={styles.mainInfoContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.buttonsContainer}>
                <span
                  className={classNames(styles.btn, {
                    [styles.activeBtn]: isBrief,
                  })}
                  onClick={() => changeContestViewMode(true)}
                >
                  Brief
                </span>
                <span
                  className={classNames(styles.btn, {
                    [styles.activeBtn]: !isBrief,
                  })}
                  onClick={() => changeContestViewMode(false)}
                >
                  Offer
                </span>
              </div>
              {isBrief ? (
                <Brief
                  contestData={contestData}
                  goChat={this.goChat}
                  role={role}
                />
              ) : (
                <div className={styles.offersContainer}>
                  {role === USER_ROLES.CREATOR &&
                    contestData.status === CONTEST_STATUS.ACTIVE && (
                      <OfferForm
                        contestId={contestData.id}
                        contestType={contestData.contestType}
                        customerId={contestData.User.id}
                      />
                    )}
                  {setOfferStatusError && (
                    <Error
                      clearError={clearSetOfferStatusError}
                      data={setOfferStatusError.data}
                      status={setOfferStatusError.status}
                    />
                  )}
                  <div className={styles.offers}>{this.setOffersList()}</div>
                </div>
              )}
            </div>
            <ContestSideBar
              contestData={contestData}
              totalEntries={offers.length}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContestPage));
