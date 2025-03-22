import { connect } from 'react-redux';
import moment from 'moment';

import { CHAT_MODES } from '../../../../constants';

import {
  changeChatBlock,
  changeChatFavorite,
  changeShowAddChatToCatalogMenu,
  goToExpandedDialog,
} from '../../../../store/slices/chatSlice';

import DialogBox from '../DialogBox/DialogBox';

import styles from './DialogList.module.sass';

function DialogList(props) {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const changeShowCatalogCreation = (event, chatId) => {
    props.changeShowAddChatToCatalogMenu(chatId);
    event.stopPropagation();
  };

  const onlyFavoriteDialogs = (chatPreview, userId) =>
    chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

  const onlyBlockDialogs = (chatPreview, userId) =>
    chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const getTimeStr = (time) => {
    const currentTime = moment();
    if (currentTime.isSame(time, 'day')) {
      return moment(time).format('HH:mm');
    }
    if (currentTime.isSame(time, 'week')) {
      return moment(time).format('dddd');
    }
    if (currentTime.isSame(time, 'year')) {
      return moment(time).format('MM DD');
    }
    return moment(time).format('MMMM DD, YYYY');
  };

  const renderPreview = (filterFunc) => {
    const arrayList = [];
    const { userId, preview, goToExpandedDialog, chatMode, removeChat } = props;
    for (const [index, chatPreview] of preview.entries()) {
      const dialogNode = (
        <DialogBox
          key={index}
          catalogOperation={
            chatMode === CHAT_MODES.CATALOG_PREVIEW
              ? removeChat
              : changeShowCatalogCreation
          }
          changeBlackList={changeBlackList}
          changeFavorite={changeFavorite}
          chatMode={chatMode}
          chatPreview={chatPreview}
          getTimeStr={getTimeStr}
          goToExpandedDialog={goToExpandedDialog}
          interlocutor={chatPreview.interlocutor}
          userId={userId}
        />
      );
      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    }
    return arrayList.length ? (
      arrayList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  const renderChatPreview = () => {
    const { chatMode } = props;
    if (chatMode === CHAT_MODES.FAVORITE_PREVIEW) {
      return renderPreview(onlyFavoriteDialogs);
    }
    if (chatMode === CHAT_MODES.BLOCKED_PREVIEW) {
      return renderPreview(onlyBlockDialogs);
    }
    return renderPreview();
  };

  return <div className={styles.previewContainer}>{renderChatPreview()}</div>;
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
  changeShowAddChatToCatalogMenu: (data) =>
    dispatch(changeShowAddChatToCatalogMenu(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
