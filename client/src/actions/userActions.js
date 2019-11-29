// Promise-based HTTP client
import axios from 'axios';
// import action type variabel
import { GET_USER, GET_USERS, UPDATE_ROLE, GET_ERROR } from './types';
// React dependency for notifications
import { toast } from 'react-toastify';
// Import REACT_APP_API_URL from .env
const dotenv = require('dotenv');
dotenv.config();
const API_URL = process.env.REACT_APP_API_URL;

// Get user details
export const userDetail = id => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/users/${id}`);

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

// Get users details
export const usersDetail = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/users`);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USERS,
      payload: null
    });
  }
};

// Edit user details
export const userEdit = (id, dataUser, history) => dispatch => {
  axios
    .put(`${API_URL}/users/${id}`, dataUser)
    .then(() => history.push('/'))
    .catch(err => {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data.errors
      });
    });
};

// Change user password
export const userEditRole = (id, dataUser, history) => async dispatch => {
  try {
    const res = await axios.patch(`${API_URL}/users/role/${id}`, dataUser);

    dispatch({
      type: UPDATE_ROLE,
      payload: res.data
    });

    // Redirect to home
    history.push('/users');
    // Show success message
    toast.success('The users role was successfully updated!', {
      position: 'top-center'
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR,
      payload: err.response.data
    });
  }
};

// Get current profile
export const getCurrentProfile = id => dispatch => {
  axios
    .get(`${API_URL}/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data.errors
      })
    );
};
