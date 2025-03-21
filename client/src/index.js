import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.unregister();
