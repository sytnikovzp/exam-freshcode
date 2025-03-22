import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CHAT_MODES, STATIC_PATHS } from '../../../../constants';
import { chatController } from '../../../../api/ws/socketController';

import {
  changeChatShow,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
  setPreviewChatMode,
} from '../../../../store/slices/chatSlice';

import ChatError from '../../../ChatError/ChatError';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';

import styles from './Chat.module.sass';

class Chat extends Component {
  componentDidMount() {
    chatController.subscribeChat(this.props.userStore.data.id);
    this.props.getPreviewChat();
  }

  componentWillUnmount() {
    chatController.unsubscribeChat(this.props.userStore.data.id);
  }

  renderDialogList = () => {
    const { setChatPreviewMode } = this.props;
    const { chatMode, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;

    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img alt='logo' src={`${STATIC_PATHS.IMAGES}/logo.png`} />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODES.NORMAL_PREVIEW,
              })}
              onClick={() => setChatPreviewMode(CHAT_MODES.NORMAL_PREVIEW)}
            >
              Normal
            </span>
            <span
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODES.FAVORITE_PREVIEW,
              })}
              onClick={() => setChatPreviewMode(CHAT_MODES.FAVORITE_PREVIEW)}
            >
              Favorite
            </span>
            <span
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODES.BLOCKED_PREVIEW,
              })}
              onClick={() => setChatPreviewMode(CHAT_MODES.BLOCKED_PREVIEW)}
            >
              Blocked
            </span>
            <span
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODES.CATALOG_PREVIEW,
              })}
              onClick={() => setChatPreviewMode(CHAT_MODES.CATALOG_PREVIEW)}
            >
              Catalog
            </span>
          </div>
        )}
        {chatMode === CHAT_MODES.CATALOG_PREVIEW ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </div>
    );
  };

  render() {
    const { isExpanded, isShow, isShowCatalogCreation, error } =
      this.props.chatStore;
    const { id } = this.props.userStore.data;
    const { changeShow, getPreviewChat } = this.props;
    return (
      <div
        className={classNames(styles.chatContainer, {
          [styles.showChat]: isShow,
        })}
      >
        {error && <ChatError getData={getPreviewChat} />}
        {isShowCatalogCreation && <CatalogCreation />}
        {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
        <div className={styles.toggleChat} onClick={() => changeShow()}>
          {isShow ? 'Hide Chat' : 'Show Chat'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
