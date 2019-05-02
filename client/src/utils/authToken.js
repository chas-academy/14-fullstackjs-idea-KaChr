// Promise-based HTTP client
import axios from 'axios';

// Set auth header
const authToken = token => {
  if (token) {
    // Set auth header to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default authToken;
