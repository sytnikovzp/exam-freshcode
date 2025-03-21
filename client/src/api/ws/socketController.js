import ChatSocket from './sockets/chatSocket';
import NotificationSocket from './sockets/notificationSocket';

export let controller;
export let chatController;

export const initSocket = (store) => {
  controller = new NotificationSocket(
    store.dispatch,
    store.getState,
    'notifications'
  );
  chatController = new ChatSocket(store.dispatch, store.getState, 'chat');
  return store;
};
