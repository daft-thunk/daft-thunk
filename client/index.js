import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history';
import store, { increment, fetchCart } from './store';
import App from './app';
import axios from 'axios';


// establishes socket connection
import './socket';

axios.put('/api/users/6/cart', {cartId: 1})

///If no cookie, make a new cart and set cookie to the id of that cart.
///if not a new user, set the cart in store to either the users cookie or the logged in users cart///

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);

