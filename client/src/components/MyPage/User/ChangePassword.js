import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

// Ska skickas med:
// email, password (nuvarande), password_new_1, password_new_2
// Submit-knapp === disabled om (password_new_1 !== password_new_2)

class ChangePassword extends Component {
  // Todo: Add the change password logic here
  // User needs to input their current password
  // And two identical passwords
  // => post that to the API => handle update only if password is correct
  // return success or error
  render() {
    return (
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
    );
  }
}

export default connect(mapStateToProps)(ChangePassword);
