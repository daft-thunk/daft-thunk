import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import products from './products';
import cart from './cart';
import activeProduct from './activeProduct';
import orders from './orders';

const reducer = combineReducers({user, products, activeProduct, orders, cart});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './activeProduct';
export * from './orders';
export * from './cart';
