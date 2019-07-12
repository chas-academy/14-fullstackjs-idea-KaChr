import React, { Component } from 'react';
import { connect } from 'react-redux';
// To add addtitonal classnames
import classnames from 'classnames';
// Import type-checking
import { PropTypes } from 'prop-types';

// Ska skickas med:
// email, password (nuvarande), password_new_1, password_new_2
// Submit-knapp === disabled om (password_new_1 !== password_new_2)

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password_new_1: '',
      password_new_2: '',
      error: {}
    };
  }
  // Todo: Add the change password logic here
  // User needs to input their current password
  // And two identical passwords
  // => post that to the API => handle update only if password is correct
  // return success or error

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // const newPasswordOne = this.state.password_new_1;
    if (this.state.password_new_1 !== this.state.password_new_2) {
      // ge felmeddelande
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <div className='form-group' id='register--form--content'>
          <label htmlFor='email'>Email adress</label>
          <input
            type='email'
            className={classnames('form-control', {
              'is-invalid': error.email
            })}
            name='email'
            value={this.state.email}
            onChange={this.onChange}
            placeholder='Enter email'
          />
          {error.email && <div className='invalid-feedback'>{error.email}</div>}
        </div>
        <div className='form-group' id='register--form--content'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={classnames('form-control', {
              'is-invalid': error.password
            })}
            name='password'
            value={this.state.password}
            onChange={this.onChange}
            placeholder='Enter password'
          />
          {error.password && (
            <div className='invalid-feedback'>{error.password}</div>
          )}
        </div>
        <div className='form-group' id='register--form--content'>
          <label htmlFor='password'>assword</label>
          <input
            type='password'
            className={classnames('form-control', {
              'is-invalid': error.password
            })}
            name='password'
            value={this.state.password_new_1}
            onChange={this.onChange}
            placeholder='Enter new password'
          />
          {error.password && (
            <div className='invalid-feedback'>{error.password}</div>
          )}
        </div>
        <div className='form-group' id='register--form--content'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={classnames('form-control', {
              'is-invalid': error.password
            })}
            name='password'
            value={this.state.password_new_2}
            onChange={this.onChange}
            placeholder='Repeate new password'
          />
          {error.password && (
            <div className='invalid-feedback'>{error.password}</div>
          )}
        </div>
      </div>
    );
  }
}

// Type-checking
ChangePassword.propTypes = {
  error: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  user: state.user.user,
  auth: state.auth
});

// function mapDispatchToProps(dispatch) {
//   return {};
// }

export default connect(mapStateToProps)(ChangePassword);
