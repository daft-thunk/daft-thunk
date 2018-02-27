
/**
 * ACTION TYPES
 */
const INCREMENT = 'INCRIMENT';

/**
 * ACTION CREATORS
 */
export const increment = () => ({type: INCREMENT});

/**
 * REDUCER
 */
export default function (state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return (state + 1) % 3;
    default:
      return state;
  }
}
