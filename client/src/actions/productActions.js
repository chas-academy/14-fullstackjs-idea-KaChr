// Promise-based HTTP client
import axios from 'axios';

// import action type variabel
import {
  GET_ERROR,
  GET_PRODUCT,
  GET_PRODUCTS_SUCCESS,
  GET_CATEGORY_PRODUCTS
} from './types';

// Import REACT_APP_API_URL from .env
const dotenv = require('dotenv');
dotenv.config();
const API_URL = process.env.REACT_APP_API_URL;

// Get product
export const getProduct = id => dispatch => {
  axios
    .get(`${API_URL}/products/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT,
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

// Get products
export const getProducts = () => dispatch => {
  axios
    .get(`${API_URL}/products`)
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
    .get(`${API_URL}/products/category/${category_url_slug}`)
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
