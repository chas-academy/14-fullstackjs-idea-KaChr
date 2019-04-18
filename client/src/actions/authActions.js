//Promise-based HTTP client
import axios from 'axios';
//import action type variabel
import { GET_ERROR } from './types';

//Register fetch (from backend)
export const userRegister = (dataUser) => dispatch => {
  axios.post(`http://localhost:8080/auth/register`, dataUser)
      .then(res => {console.log(res.data)})
      .catch(err => dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
      );
};
