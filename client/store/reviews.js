import axios from 'axios';
/**
 * ACTION TYPES
 */
const INIT_REVIEWS = 'INIT REVIEWS';
const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

/**
 * ACTION CREATORS
 */
const initReviews = reviews => ({ type: INIT_REVIEWS, reviews });
export const submitReview = review => ({ type: SUBMIT_REVIEW, review });

/**
 * THUNK CREATORS
 */
export const getReviewsThunk = () => dispatch => {
  return axios
    .get('/api/reviews')
    .then(res => dispatch(initReviews(res.data)))
    .catch(err => console.error(`Fetching reviews unsuccessful`, err));
};

export const submitReviewThunk = (review) => dispatch => {
  return axios
    .post('/api/reviews', review)
    .then(res => dispatch(submitReview(res.data)))
    .catch(err => console.error(`Creating review: ${review} unsuccessful`, err));
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SUBMIT_REVIEW:
      return [action.review];// to check: reviews.length === 1
    case INIT_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
}
