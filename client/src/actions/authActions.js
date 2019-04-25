//Promise-based HTTP client
import axios from 'axios';
//import action type variabel
import { GET_ERROR, SET_CURRENT_USER } from './types';
//Token for header
import authToken from '../utils/authToken';
//Token decode
import jwt_decode from 'jwt-decode';



//Register fetch (from backend)
export const userRegister = (dataUser, history) => dispatch => {
  axios.post(`http://localhost:8080/auth/register`, dataUser)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
      );
};

//Login (with token)
export const userLogin = dataUser => dispatch => {
  axios.post(`http://localhost:8080/auth/login`, dataUser)
  .then(res => {
    //Save token to lockal storage
    const { token } = res.data;
    //Set token to local storage
    localStorage.setItem('jwtToken', token);
    //Set token to auth header
    authToken(token);
    //Token decodeing to get the user data
    const jwtDecoded = jwt_decode(token);
    //Set the current user
    dispatch(currentUser(jwtDecoded));
  })
  .catch(err => dispatch({
      type: GET_ERROR,
      payload: err.response.data
    })
  );
};

//Set user that is logged in
export const currentUser = jwtDecoded => {
  return {
    type: SET_CURRENT_USER,
    payload: jwtDecoded
  }
}

//Logout (remove token)
export const userLogout = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem('jwtToken');
  //No auth header for coming requests
  authToken(false);
  //Set an empty object to current user, isAuth = false
  dispatch(currentUser({}));
}
