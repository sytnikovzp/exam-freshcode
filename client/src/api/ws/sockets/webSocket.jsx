import socketIoClient from 'socket.io-client';

import { API_CONFIG } from '../../../constants';

class WebSocket {
  constructor(dispatch, getState, room) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.socket = socketIoClient(`${API_CONFIG.BASE_URL}/${room}`, {
      origins: 'localhost:*',
    });
    this.listen();
  }

  listen = () => {
    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  };

  anotherSubscribes = () => {};
}

export default WebSocket;
