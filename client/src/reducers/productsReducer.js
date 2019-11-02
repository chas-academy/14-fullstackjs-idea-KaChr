// import action type variabel
import { GET_PRODUCTS_SUCCESS } from '../actions/types';

// Set initial state to empty obect
const initState = {
  products: []
};

// Export state accordingly to how its manipulated with the help of action type, if no change return initState
export default (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};
