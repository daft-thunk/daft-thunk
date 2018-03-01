import axios from 'axios';
/**
 * ACTION TYPES
 */
const INIT_ORDERS = 'INIT ORDERS';
const PLACE_ORDER = 'PLACE_ORDER';

/**
 * ACTION CREATORS
 */
const initOrders = orders => ({ type: INIT_ORDERS, orders });
export const placeOrder = order => ({ type: PLACE_ORDER, order });

/**
 * THUNK CREATORS
 */
export const getOrdersThunk = () => dispatch => {
  return axios
    .get('/api/orders')
    .then(res => dispatch(initOrders(res.data)))
    .catch(err => console.log(err));
};

export const addOrder = (order) => dispatch => {
  axios
    .post('api/orders', order)
    .then(res => dispatch(placeOrder(res.data)))
    .catch(err => console.error(`Creating order: ${order} unsuccessful`, err));
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case PLACE_ORDER:
      return action.order;
    case INIT_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
