//Import action type variabel
import { GET_ERROR } from '../actions/types';

//Set initial state to empty obect
const initState = {};

//Export state accordingly to how its manipulated with the help of action type, if no change return initState
export default (state = initState, action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    default:
    return state;
  }
}
