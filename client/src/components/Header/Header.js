import React, { Component } from 'react';
//Import link
import { Link } from 'react-router-dom';
//Connecting redux to component
import { connect } from 'react-redux';
//import actions from authActions
import { userLogout } from '../../actions/authActions';

class Header extends Component {
  onLogout = (e) => {
    e.preventDefault();
    this.props.userLogout();
  }

  render() {
    const { isAuth } = this.props.auth;

    //Links that show when logged in
    const linkAuth = (
      <div>
        <Link className="navbar-brand" to="/#" onClick={this.onLogout}>
          Logout
        </Link>
      </div>
    );

    //Links that show when logged out
    const linkGuest = (
      <div>
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </div>
    );

    return (
      <div>
        <Link className="navbar-brand" to="/">
          The Garden
        </Link>
        {isAuth ? linkAuth : linkGuest}
      </div>
    );
  }
}

// Making props out of states to use in component
const mapStateToProps = state => ({
  auth: state.auth
});

// Connects the variable with the action (connecting redux to the component)
export default connect(mapStateToProps, { userLogout })(Header);
