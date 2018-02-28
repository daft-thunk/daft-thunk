import axios from 'axios';


//ACTION TYPES
const PLACE_ORDER = 'PLACE_ORDER';

//ACTION CREATORS
export const placeOrder = (order) => ({ type: PLACE_ORDER, order });
//THUNKS
export const addOrder = order => dispatch => {
  axios.post('api/orders', order)
    .then(res => dispatch(placeOrder(res.data)))
    .catch(err => console.error(`Creating order: ${order} unsuccessful`, err));
};

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case PLACE_ORDER:
      return (action.order);
    default:
      return state;
  }
}
