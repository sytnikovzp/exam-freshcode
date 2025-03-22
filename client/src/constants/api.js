const ENV = process.ENV.NODE_ENV || 'development';
const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;

export const API_CONFIG = {
  BASE_URL: `http://${SERVER_HOST}:${SERVER_PORT}`,
  PUBLIC_URL:
    ENV === 'production'
      ? `http://${SERVER_HOST}:80/images`
      : `http://${SERVER_HOST}:${SERVER_PORT}/public/images`,
};
