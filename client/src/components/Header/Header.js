import React, { Component } from 'react';
// Import link
import { Link, withRouter } from 'react-router-dom';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// import actions from authActions
import { userLogout } from '../../actions/authActions';
// import actions from userActions
import { userDetail } from '../../actions/userActions';

class Header extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.userLogout();
  };

  render() {
    const { isAuth, user } = this.props.auth;

    // Links that show when logged in
    const linkAuth = (
      <div>
        <li className='nav-item'>
          <Link className='nav-link' to={`/user/${user.id}`}>
            My information
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={`/user/edit/${user.id}`}>
            Change information
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={`/user/update-password/${user.id}`}>
            Change password
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/#' onClick={this.onLogout}>
            Logout
          </Link>
        </li>
      </div>
    );

    // Links that show when logged out
    const linkGuest = (
      <div>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Register
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </div>
    );

    return (
      <div>
        <nav className='navbar navbar-dark bg-dark fixed-top'>
          <Link className='navbar-brand' to='/'>
            The Garden
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#collapsingNavbar'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='navbar-collapse collapse' id='collapsingNavbar'>
            <ul className='navbar-nav'>{isAuth ? linkAuth : linkGuest}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

// Type-checking
Header.propTypes = {
  userDetail: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Making props out of states to use in component
const mapStateToProps = state => ({
  auth: state.auth
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { userDetail, userLogout }
)(withRouter(Header));
