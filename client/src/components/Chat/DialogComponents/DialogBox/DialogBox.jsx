import classNames from 'classnames';

import { API_CONFIG, CHAT_MODES, STATIC_PATHS } from '../../../../constants';

import styles from './DialogBox.module.sass';

function DialogBox(props) {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const { favoriteList, participants, blackList, _id, text, createAt } =
    chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];
  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            _id,
            blackList,
            favoriteList,
          },
        })
      }
    >
      <img
        alt='user'
        src={
          interlocutor.avatar === 'anon.png'
            ? STATIC_PATHS.ANONYM_IMAGE
            : `${API_CONFIG.PUBLIC_URL}/${interlocutor.avatar}`
        }
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>
          <i
            className={classNames({
              'far fa-heart': !isFavorite,
              'fas fa-heart': isFavorite,
            })}
            onClick={(event) =>
              changeFavorite(
                {
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event
              )
            }
          />
          <i
            className={classNames({
              'fas fa-user-lock': !isBlocked,
              'fas fa-unlock': isBlocked,
            })}
            onClick={(event) =>
              changeBlackList(
                {
                  participants,
                  blackListFlag: !isBlocked,
                },
                event
              )
            }
          />
          <i
            className={classNames({
              'far fa-plus-square': chatMode !== CHAT_MODES.CATALOG_PREVIEW,
              'fas fa-minus-circle': chatMode === CHAT_MODES.CATALOG_PREVIEW,
            })}
            onClick={(event) => catalogOperation(event, _id)}
          />
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
