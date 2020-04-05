import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './assets/sass/styles.sass';
import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
// import logger from 'redux-logger';
import App from './containers/App/index';
import redusers from './store/reducers';
import Api from './api/api';
import thunk from 'redux-thunk';

const history = createBrowserHistory();

const NODE_ENV = process.env.NODE_ENV;
const content = document.getElementById('app');
let middleware = [thunk, routerMiddleware(history)];

// if (NODE_ENV === 'development') {
// 	middlewares.push(logger);
// }

middleware = applyMiddleware(...middleware);

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    );
}

const store = createStore(
  connectRouter(history)(redusers),
  middleware
);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
) , content);
