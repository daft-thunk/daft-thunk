import axios from 'axios';

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';

const getAllCategories = categories => ({ type: GET_ALL_CATEGORIES, categories });
const addCategory = category => ({ type: ADD_CATEGORY, category});

export const fetchCategories = () => dispatch => {
  return axios.get('/api/categories')
    .then(res => res.data)
    .then(categories => dispatch(getAllCategories(categories)))
    .catch(console.error);
};

export const createCategory = category => dispatch => {
  return axios.post('/api/categories', {name: category})
    .then(res => res.data)
    .then(newCategory => dispatch(addCategory(newCategory)))
    .catch(console.error);
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
}
