// Promise-based HTTP client
import axios from 'axios';
// import action type variabel
import { GET_USER, GET_ERROR } from './types';

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

// use this?
// Check if token exists
// if (localStorage.jwtToken) {
//   // Set token to auth header
//   authToken(localStorage.jwtToken);
//   // Token decodeing to get the user data
//   const jwtDecoded = jwt_decode(localStorage.jwtToken);
//   // Set the current user and isAuth
//   store.dispatch(currentUser(jwtDecoded));

//   // Check if token has expired
//   const presentTime = Date.now() / 1000;
//   if (jwtDecoded.exp < presentTime) {
//     // Logout user if token has expired
//     store.dispatch(userLogout());
//     // Redirect to login after logout
//     window.location.href = '/login';
//   }
// }
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
