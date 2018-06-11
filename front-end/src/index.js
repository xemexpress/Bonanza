import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker';

const defaultState = {
  appName: 'Bonanza',
  companies: null
}

const reducer = (state=defaultState, action) => {
  return state
}

const store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
