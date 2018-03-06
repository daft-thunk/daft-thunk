import axios from 'axios';
/**
 * ACTION TYPES
 */
const INIT_PRODUCTS = 'INIT PRODUCTS';
const FILTER_PRODUCTS = 'FILTER PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

/**
 * ACTION CREATORS
 */
export const initProducts = (products) => ({type: INIT_PRODUCTS, products});
export const filterProducts = (id) => ({type: FILTER_PRODUCTS, id});
export const createProduct = (product) => ({type: CREATE_PRODUCT, product});

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(initProducts(res.data)))
      .catch(err => console.log(err));

export const createProductThunk = (product) =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res => {
        console.log('thunk response',res)
        return dispatch(createProduct(res.data))
      })
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
    case CREATE_PRODUCT:
      return [...state.allProducts, action.product];
    default:
      return state;
  }
}
