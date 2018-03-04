import axios from 'axios';
import history from '../history';
/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
const CHANGE_USER = 'CHANGE_USER';

/**
 * ACTION CREATORS
 */
export const getUsers = users => ({ type: GET_USERS, users });
export const changeUser = user => ({ type: CHANGE_USER, user });

/**
 * THUNK CREATORS
 */
export const getUsersThunk = () => dispatch => {
  return axios
    .get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.error(`Fetching users unsuccessful`, err));
};

export const changeUserThunk = (user) => dispatch => {
  return axios
    .put(`/api/users/${user.id}`, user)
    // .then(res => dispatch(changeUser(res.data)))
    .then(res => {console.log(CHANGE_USER, res.data);})
    .catch(err => console.error(`Updating user: ${user} unsuccessful`, err));
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
