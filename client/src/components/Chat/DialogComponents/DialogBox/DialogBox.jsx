import classNames from 'classnames';

import CONSTANTS from '../../../../constants';

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
            ? CONSTANTS.ANONYM_IMAGE_PATH
            : `${CONSTANTS.publicURL}${interlocutor.avatar}`
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
              'far fa-plus-square':
                chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle':
                chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
            onClick={(event) => catalogOperation(event, _id)}
          />
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
