// import action type variabel
import { GET_USER } from '../actions/types';

const initState = {
  user: {}
};

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
