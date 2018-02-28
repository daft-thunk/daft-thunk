import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import products from './products';
<<<<<<< HEAD
import activeProduct from './activeProduct';


const reducer = combineReducers({user, products, activeProduct});
=======
import orders from './orders'


const reducer = combineReducers({user, products, orders});
>>>>>>> master
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
<<<<<<< HEAD
export * from './activeProduct';
=======
export * from './orders';
>>>>>>> master
