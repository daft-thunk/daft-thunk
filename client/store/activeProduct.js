
const SET_PRODUCT = 'SET PRODUCT';

/**
 * ACTION CREATORS
 */
export const setProduct = (product) => ({type: SET_PRODUCT, product});

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
