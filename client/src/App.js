import React, { Component } from 'react';
// Import from redux
import store from './store';
// Provides application with store
import { Provider } from 'react-redux';
// Import router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Token decode
import jwt_decode from 'jwt-decode';
// Token for header
import authToken from './utils/authToken';
// Sets user that is logged in
import { currentUser, userLogout } from './actions/authActions';
// Container for notifications
import { ToastContainer } from 'react-toastify';
// Notification CSS
import 'react-toastify/dist/ReactToastify.css';

// Import route protection
import PrivateRoute from './helpers/privateRoute';
// Import components
import {
  Header,
  Home,
  Register,
  Login,
  UserDetail,
  UserEdit,
  ChangePassword,
  CategoryProducts,
  ProductDetail
} from './components';
// Import CSS
import './App.css';

// Check if token exists
if (localStorage.jwtToken) {
  // Set token to auth header
  authToken(localStorage.jwtToken);
  // Token decodeing to get the user data
  const jwtDecoded = jwt_decode(localStorage.jwtToken);
  // Set the current user and isAuth
  store.dispatch(currentUser(jwtDecoded));

  // Check if token has expired
  const presentTime = Date.now() / 1000;
  if (jwtDecoded.exp < presentTime) {
    // Logout user if token has expired
    store.dispatch(userLogout());
    // Redirect to login after logout
    window.location.href = '/login';
  }
}

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Header />
            <ToastContainer />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exact path='/user/:id' component={UserDetail} />
              <PrivateRoute exact path='/user/edit/:id' component={UserEdit} />
              <PrivateRoute
                exact
                path='/user/update-password/:id'
                component={ChangePassword}
              />
              <PrivateRoute
                exact
                path='/category/:category_url_slug'
                component={CategoryProducts}
              />
              <PrivateRoute
                exact
                path='/product/:id'
                component={ProductDetail}
              />
            </Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
