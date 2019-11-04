// Promise-based HTTP client
import axios from 'axios';

// import action type variabel
import {
  GET_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_CATEGORY_PRODUCTS
} from './types';

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

// Get products by category
export const getProductsByCategory = category_url_slug => dispatch => {
  axios
    .get(`http://localhost:8080/products/category/${category_url_slug}`)
    .then(res => {
      dispatch({
        type: GET_CATEGORY_PRODUCTS,
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
