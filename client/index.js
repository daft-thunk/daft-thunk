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

// function setCookie(cname, cvalue, exdays) {
//   var d = new Date();
//   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   var expires = "expires="+ d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

///If no cookie, make a new cart and set cookie to the id of that cart.
///if not a new user, set the cart in store to either the users cookie or the logged in users cart///
if (!document.cookie) {
  axios.post('/api/cart')
  .then(res => res.data)
  .then(cart => {
    document.cookie = cart.id;
    store.dispatch(fetchCart(cart.id));
  });
}
else {
  // const cartId = store.user.id ? store.user.cart.id : document.cookie;
  store.dispatch(fetchCart(document.cookie));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);

