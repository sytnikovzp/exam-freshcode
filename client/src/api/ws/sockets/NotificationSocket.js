import { toast } from 'react-toastify';

import Notification from '../../../components/Notification/Notification';

import WebSocket from './webSocket';

class NotificationSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      toast('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', (message) => {
      toast(
        <Notification contestId={message.contestId} message={message.message} />
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      toast('New Entry');
    });
  };

  subscribe = (id) => {
    this.socket.emit('subscribe', id);
  };

  unsubsctibe = (id) => {
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
