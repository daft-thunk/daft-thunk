import axios from 'axios';
import history from '../history';
/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS';
const CHANGE_USER = 'CHANGE_USER';
const DELETE_USER = 'DELETE_USER';

/**
 * ACTION CREATORS
 */
export const getUsers = users => ({ type: GET_USERS, users });
export const changeUser = user => ({ type: CHANGE_USER, user });
export const deleteUser = userId => ({ type: DELETE_USER, userId });

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

export const deleteUserThunk = (userId) => dispatch => {
  return axios
    .delete(`/api/users/${userId}`)
    .then(res => dispatch(deleteUser(userId)))
    .catch(err => console.error(`Deleting user id #${userId} unsuccessful`, err));
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId);
    default:
      return state;
  }
}
