import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = cart => ({type: SET_CART, cart});

export const fetchCart = cartId => dispatch => {
  axios.get(`/api/cart/${cartId}`)
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(console.error);
};

export default function(state = {}, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}

