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


///If no cookie, make a new cart and set cookie to the id of that cart.
///if not a new user, set the cart in store to either the users cookie or the logged in users cart///
axios.get('/sessionCart')
  .then(res => res.data)
<<<<<<< HEAD
    .then(cartId => store.dispatch(fetchCart(cartId)))
  .catch(console.error);
=======
  .then(cart => {
    document.cookie = cart.id;
    store.dispatch(fetchCart(4));
  });
}
else {
  store.dispatch(fetchCart(4));
}
>>>>>>> master

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);

