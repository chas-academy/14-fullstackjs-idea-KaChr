// import action type variabel
import { GET_USER } from '../actions/types';

// Set initial state to empty obect
const initState = {
  user: {}
};

// Export state accordingly to how its manipulated with the help of action type, if no change return initState
export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
