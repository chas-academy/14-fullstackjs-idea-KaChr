// Promise-based HTTP client
import axios from 'axios';
// import action type variabel
import { GET_USER } from './types';

// Get user details
export const userDetail = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER,
      payload: null
    });
  }
};
