import React from 'react';
//Import router
import { Route, Redirect } from 'react-router-dom';
//Connecting redux to component
import { connect } from 'react-redux';

//Check if logged in, then display component else redirect to login
const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      auth.isAuth === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// Making props out of states to use in component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Connects the variable with the action (connecting redux to the component)
export default connect(mapStateToProps)(PrivateRoute);
