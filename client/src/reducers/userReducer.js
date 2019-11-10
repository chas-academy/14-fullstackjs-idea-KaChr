// import action type variabel
import { GET_USER, GET_USERS, UPDATE_ROLE } from '../actions/types';

// Set initial state to empty obect
const initState = {
  user: {},
  users: [],
  admin: null
};

// Export state accordingly to how its manipulated with the help of action type, if no change return initState
export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case UPDATE_ROLE:
      return {
        ...state,
        admin: action.payload
      };
    default:
      return state;
  }
};
