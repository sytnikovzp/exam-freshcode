import axios from 'axios';

import { API_CONFIG, AUTH_TOKENS } from '../constants';

import history from '../browserHistory';

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(AUTH_TOKENS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      window.localStorage.setItem(
        AUTH_TOKENS.ACCESS_TOKEN,
        response.data.token
      );
    }
    return response;
  },
  (err) => {
    if (
      err.response.status === 408 &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/login');
    }
    return Promise.reject(err);
  }
);

export default instance;
