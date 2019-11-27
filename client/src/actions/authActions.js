// Promise-based HTTP client
import axios from 'axios';
// Token decode
import jwt_decode from 'jwt-decode';
// import action type variabel
import { GET_ERROR, SET_CURRENT_USER, UPDATE_PASSWORD } from './types';
// Token for header
import authToken from '../utils/authToken';
// React dependency for notifications
import { toast } from 'react-toastify';
// Import REACT_APP_API_URL from .env
const dotenv = require('dotenv');
dotenv.config();
const API_URL = process.env.REACT_APP_API_URL;

// Register fetch (from backend)
export const userRegister = (dataUser, history) => dispatch => {
  axios
    .post(`${API_URL}/auth/register`, dataUser)
    // eslint-disable-next-line no-unused-vars
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

// Login (with token)
export const userLogin = dataUser => dispatch => {
  axios
    .post(`${API_URL}/auth/login`, dataUser)
    .then(res => {
      // Save token to lockal storage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      authToken(token);
      //T oken decodeing to get the user data
      const jwtDecoded = jwt_decode(token);
      // Set the current user
      dispatch(currentUser(jwtDecoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

// Set user that is logged in
export const currentUser = jwtDecoded => {
  return {
    type: SET_CURRENT_USER,
    payload: jwtDecoded
  };
};

// Change user password
export const updatePassword = (userData, history) => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/auth/update-password`, userData);

    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data
    });

    // Redirect to home
    history.push('/');
    // Show success message
    toast.success('The password was successfully updated!', {
      position: 'top-center'
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: err.response.data
    });
  }
};

// Logout (remove token)
export const userLogout = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // No auth header for coming requests
  authToken(false);
  // Set an empty object to current user, isAuth = false
  dispatch(currentUser({}));
};
