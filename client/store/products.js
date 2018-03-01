import axios from 'axios';
/**
 * ACTION TYPES
 */
const INIT_PRODUCTS = 'INIT PRODUCTS';
const FILTER_PRODUCTS = 'FILTER PRODUCTS';

/**
 * ACTION CREATORS
 */
export const initProducts = (products) => ({type: INIT_PRODUCTS, products});
export const filterProducts = (id) => ({type: FILTER_PRODUCTS, id});

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(initProducts(res.data)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = {allProducts: [], filteredProducts: []}, action) {
  switch (action.type) {
    case INIT_PRODUCTS:
      return {allProducts: action.products, filteredProducts: action.products};
    case FILTER_PRODUCTS:
      if (action.id === 'showAll') {
        return {...state, filteredProducts: state.allProducts};
      }
      return {...state, filteredProducts: state.allProducts.filter(product => product.categories[0] && product.categories[0].id === action.id)};
    default:
      return state;
  }
}
