import axios from 'axios';

const SET_PRODUCT = 'SET PRODUCT';

/**
 * ACTION CREATORS
 */
export const setProduct = (product) => ({type: SET_PRODUCT, product});

/**
 * THUNKS
 */

 export const setProductThunk = (id) => dispatch => {
   axios.get(`/api/products/${id}`)
   .then(res => res.data)
   .then(product => dispatch(setProduct(product)))
   .catch(console.error);
 };

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
