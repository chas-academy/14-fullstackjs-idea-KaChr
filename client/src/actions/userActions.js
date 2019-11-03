// Promise-based HTTP client
import axios from 'axios';
// import action type variabel
import { GET_USER, GET_USERS, GET_ERROR } from './types';

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

// Get users details
export const usersDetail = () => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/users`);

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
    .put(`http://localhost:8080/users/${id}`, dataUser)
    .then(() => history.push('/'))
    .catch(err => {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data.errors
      });
    });
};

// Get current profile
export const getCurrentProfile = id => dispatch => {
  axios
    .get(`http://localhost:8080/users/${id}`)
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
