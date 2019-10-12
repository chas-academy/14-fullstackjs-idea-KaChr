// import action type variabel
import { SET_CURRENT_USER, UPDATE_PASSWORD } from '../actions/types';
// To check if payload empty
const isEmpty = require('lodash/isEmpty');

// Set initial state
const initState = {
  isAuth: false,
  user: {}
};

// Export state accordingly to how its manipulated with the help of action type, if no change return initState.
export default (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
