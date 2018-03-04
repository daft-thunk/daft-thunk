import axios from 'axios';
import  history  from '../history';
/**
 * ACTION TYPES
 */
const INIT_ORDERS = 'INIT ORDERS';
const PLACE_ORDER = 'PLACE_ORDER';
const CHANGE_ORDER = 'CHANGE_ORDER';

/**
 * ACTION CREATORS
 */
const initOrders = orders => ({ type: INIT_ORDERS, orders });
export const placeOrder = order => ({ type: PLACE_ORDER, order });
const changeOrder = order => ({ type: CHANGE_ORDER, order });

/**
 * THUNK CREATORS
 */
export const getOrdersThunk = () => dispatch => {
  return axios
    .get('/api/orders')
    .then(res => dispatch(initOrders(res.data)))
    .catch(err => console.error(`Fetching orders unsuccessful`, err));
};

export const getUserOrders = userId => dispatch => {
  return axios.get(`/api/orders/by/${userId}`)
    .then(res => res.data)
    .then(orders => dispatch(initOrders(orders)))
    .catch(console.error);
};

export const addOrder = (order) => dispatch => {
  axios
    .post('/api/orders', order)
    .then(res => dispatch(placeOrder(res.data)))
    .then(history.push('/confirmation'))
    .catch(err => console.error(`Creating order: ${order} unsuccessful`, err));
};

export const changeOrderThunk = (order) => dispatch => {
  return axios
    .put(`/api/orders/${order.id}`, order)
    .then(res => dispatch(changeOrder(res.data)))
    .catch(err => console.error(`Updating order: ${order} unsuccessful`, err));
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case PLACE_ORDER:
      return [action.order];// to check: orders.length === 1
    case INIT_ORDERS:
      return action.orders;
    case CHANGE_ORDER:
      return state;
    default:
      return state;
  }
}
