// Promise-based HTTP client
import axios from 'axios';

// import action type variabel
import { GET_ERROR, GET_PRODUCTS_SUCCESS } from './types';

// Get products
export const getProducts = () => dispatch => {
  axios
    .get(`http://localhost:8080/products`)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERROR,
        payload: err
      });
    });
};
