import React, { Component } from 'react';
//Import from redux
import store from './store';
//Provides application with store
import { Provider } from 'react-redux';
//Import router
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Token decode
import jwt_decode from 'jwt-decode';
//Token for header
import authToken from './utils/authToken';
//Sets user that is logged in
import { currentUser } from './actions/authActions';

// Import components
import { Home, Register, Login } from './components';
//Import CSS
import './App.css';

//Check if token exists
if (localStorage.jwtToken) {
  //Set token to auth header
  authToken(localStorage.jwtToken);
  //Token decodeing to get the user data
  const jwtDecoded = jwt_decode(localStorage.jwtToken);
  //Set the current user and isAuth
  store.dispatch(currentUser(jwtDecoded));
}

export class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
        <div className="App">
            <Route exact path="/" component={ Home } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
