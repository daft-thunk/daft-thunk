import axios from 'axios';

const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

const setCart = cart => ({ type: SET_CART, cart });
const addToCart = product => ({ type: ADD_TO_CART, product });

export const fetchCart = cartId => dispatch => {
  axios.get(`/api/cart/${cartId}`)
    .then(res => res.data)
    .then(cart => dispatch(setCart(cart)))
    .catch(console.error);
};

export const addProductToCart = (cartId, productId) => dispatch => {
  axios.post(`/api/cart/${cartId}`, productId)
    .then(() => dispatch(fetchCart(cartId)))
    .catch(err => console.error(`Adding to cart unsuccessful`, err));
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}

