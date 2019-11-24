// Promise-based HTTP client
import axios from 'axios';
// import action type variabel
import { GET_USER, GET_USERS, UPDATE_ROLE, GET_ERROR } from './types';
// React dependency for notifications
import { toast } from 'react-toastify';

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

// Change user password
export const userEditRole = (id, dataUser, history) => async dispatch => {
  try {
    const res = await axios.patch(
      `http://localhost:8080/users/role/${id}`,
      dataUser
    );

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
