// import action type variabel
import {
  GET_PRODUCTS_SUCCESS,
  GET_CATEGORY_PRODUCTS,
  GET_PRODUCT
} from '../actions/types';

// Set initial state to empty obect
const initState = {
  products: [],
  product: {}
};

// Export state accordingly to how its manipulated with the help of action type, if no change return initState
export default (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };
    case GET_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    default:
      return state;
  }
};
