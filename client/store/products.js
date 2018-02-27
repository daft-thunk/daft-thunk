import axios from 'axios'
/**
 * ACTION TYPES
 */
const INIT_PRODUCTS = 'INIT PRODUCTS'

/**
 * ACTION CREATORS
 */
const initProducts = (products) => ({type: INIT_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(initProducts(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_PRODUCTS:
      return action.products
    default:
      return state
  }
}
