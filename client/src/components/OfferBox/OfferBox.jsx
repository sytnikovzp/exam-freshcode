import { confirmAlert } from 'react-confirm-alert';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import {
  API_CONFIG,
  CONTEST_TYPES,
  OFFER_STATUS,
  STATIC_PATHS,
  USER_ROLES,
} from '../../constants';

import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  changeMark,
  changeShowImage,
  clearChangeMarkError,
} from '../../store/slices/contestByIdSlice';

import withRouter from '../../hocs/withRouter';

import styles from './OfferBox.module.sass';

import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

function OfferBox(props) {
  const findConversationInfo = () => {
    const { messagesPreview, id } = props;
    const participants = [id, props.data.User.id];
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

  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMark = (value) => {
    props.clearError();
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = props.data;
    if (status === OFFER_STATUS.REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }
    if (status === OFFER_STATUS.WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }
    return null;
  };

  const goChat = () => {
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo(),
    });
  };

  const { data, role, id, contestType } = props;
  const { avatar, firstName, lastName, email, rating } = props.data.User;
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              alt='user'
              src={
                avatar === 'anon.png'
                  ? STATIC_PATHS.ANONYM_IMAGE
                  : `${API_CONFIG.PUBLIC_URL}/${avatar}`
              }
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              readonly
              emptySymbol={
                <img
                  alt='star-outline'
                  src={`${STATIC_PATHS.IMAGES}/star-outline.png`}
                />
              }
              fractions={2}
              fullSymbol={
                <img alt='star' src={`${STATIC_PATHS.IMAGES}/star.png`} />
              }
              initialRating={rating}
              placeholderSymbol={
                <img alt='star' src={`${STATIC_PATHS.IMAGES}/star.png`} />
              }
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestType === CONTEST_TYPES.LOGO ? (
            <img
              alt='logo'
              className={styles.responseLogo}
              src={`${API_CONFIG.PUBLIC_URL}/${data.fileName}`}
              onClick={() =>
                props.changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
          {data.User.id !== id && (
            <Rating
              emptySymbol={
                <img
                  alt='star'
                  src={`${STATIC_PATHS.IMAGES}/star-outline.png`}
                />
              }
              fractions={2}
              fullSymbol={
                <img alt='star' src={`${STATIC_PATHS.IMAGES}/star.png`} />
              }
              placeholderRating={data.mark}
              placeholderSymbol={
                <img alt='star' src={`${STATIC_PATHS.IMAGES}/star.png`} />
              }
              onClick={changeMark}
            />
          )}
        </div>
        {role !== USER_ROLES.CREATOR && (
          <i className='fas fa-comments' onClick={goChat} />
        )}
      </div>
      {props.needButtons(data.status) && (
        <div className={styles.btnsContainer}>
          <div className={styles.resolveBtn} onClick={resolveOffer}>
            Resolve
          </div>
          <div className={styles.rejectBtn} onClick={rejectOffer}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeMark: (data) => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

const mapStateToProps = (state) => {
  const { changeMarkError } = state.contestByIdStore;
  const { id, role } = state.userStore.data;
  const { messagesPreview } = state.chatStore;
  return {
    changeMarkError,
    id,
    role,
    messagesPreview,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBox)
);
