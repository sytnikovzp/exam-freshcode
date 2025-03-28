import { connect } from 'react-redux';
import classNames from 'classnames';

import { API_CONFIG, STATIC_PATHS } from '../../../../constants';

import {
  backToDialogList,
  changeChatBlock,
  changeChatFavorite,
} from '../../../../store/slices/chatSlice';

import styles from './ChatHeader.module.sass';

function ChatHeader(props) {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (chatData, userId) => {
    const { favoriteList, participants } = chatData;
    return favoriteList[participants.indexOf(userId)];
  };

  const isBlocked = (chatData, userId) => {
    const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];
  };

  const { avatar, firstName } = props.interlocutor;
  const { backToDialogList, chatData, userId } = props;
  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => backToDialogList()}
      >
        <img alt='back' src={`${STATIC_PATHS.IMAGES}/arrow-left-thick.png`} />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            alt='user'
            src={
              avatar === 'anon.png'
                ? STATIC_PATHS.ANONYM_IMAGE
                : `${API_CONFIG.PUBLIC_URL}/${avatar}`
            }
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i
              className={classNames({
                'far fa-heart': !isFavorite(chatData, userId),
                'fas fa-heart': isFavorite(chatData, userId),
              })}
              onClick={(event) =>
                changeFavorite(
                  {
                    participants: chatData.participants,
                    favoriteFlag: !isFavorite(chatData, userId),
                  },
                  event
                )
              }
            />
            <i
              className={classNames({
                'fas fa-user-lock': !isBlocked(chatData, userId),
                'fas fa-unlock': isBlocked(chatData, userId),
              })}
              onClick={(event) =>
                changeBlackList(
                  {
                    participants: chatData.participants,
                    blackListFlag: !isBlocked(chatData, userId),
                  },
                  event
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { interlocutor, chatData } = state.chatStore;
  return { interlocutor, chatData };
};

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
