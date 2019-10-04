import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './assets/sass/styles.sass';
import Cookies from 'js-cookie';
import { applyMiddleware, createStore, compose } from 'redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { Router, Route } from 'react-router'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger';
import App from './containers/App/index';
import redusers from './reducers';
import rootSaga from './sagas';
import Api from './api/api';

const history = createBrowserHistory();

const NODE_ENV = process.env.NODE_ENV;
const content = document.getElementById('app');
const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware, routerMiddleware(history)];

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

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
) , content);
