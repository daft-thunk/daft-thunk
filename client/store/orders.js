import axios from 'axios';
/**
 * ACTION TYPES
 */
const INIT_ORDERS = 'INIT ORDERS';

/**
 * ACTION CREATORS
 */
const initOrders = (orders) => ({type: INIT_ORDERS, orders});

/**
 * THUNK CREATORS
 */
export const getOrdersThunk = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res =>
        dispatch(initOrders(res.data)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
