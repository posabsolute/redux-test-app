import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middlewares/api';
import validateMiddleware from '../middlewares/validate';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import ReduxLocalstorage from 'redux-simple-localstorage';

const {read, write} = ReduxLocalstorage('appStore');
const logger = createLogger({ collapsed: true });

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    validateMiddleware,
    write,
    logger,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
