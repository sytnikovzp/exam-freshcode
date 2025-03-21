import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import * as serviceWorker from './serviceWorker';

import './index.css';

import App from './App.jsx';

createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.unregister();
