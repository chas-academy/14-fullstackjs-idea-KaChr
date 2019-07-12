import React, { Component } from 'react';
// Connecting redux to component
import { connect } from 'react-redux';
// To add addtitonal classnames
import classnames from 'classnames';
// Import type-checking
import { PropTypes } from 'prop-types';
// Import withRouter
import { withRouter } from 'react-router-dom';
// import actions
import { updatePassword } from '../../../actions/authActions';
// import { successMessage } from '../../../actions/messageAtions';
const isEmpty = require('lodash/isEmpty');

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_new_1: '',
      password_new_2: '',
      error: {},
      user: {}
    };
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!isEmpty(nextProps.error)) {
      this.setState({ error: nextProps.error });
    }
    if (!isEmpty(nextProps.user)) {
      this.setState({ user: nextProps.user });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.password_new_1 === this.state.password_new_2) {
      // TODO DOKUMENTERA

      const userData = {
        email: this.state.email,
        password: this.state.password,
        password_new_1: this.state.password_new_1,
        password_new_2: this.state.password_new_2
      };

      this.props.updatePassword(userData, this.props.history);
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <div id='edit-user'>
          <h2>Change password:</h2>
          <form id='register--form' onSubmit={e => this.onSubmit(e)}>
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
              {error.email && (
                <div className='invalid-feedback'>{error.email}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='password'>Current password</label>
              <input
                type='password'
                className={classnames('form-control', {
                  'is-invalid': error.password
                })}
                name='password'
                value={this.state.password}
                onChange={this.onChange}
                placeholder='Enter current password'
              />
              {error.password && (
                <div className='invalid-feedback'>{error.password}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='password'>New password</label>
              <input
                type='password'
                className={classnames('form-control', {
                  'is-invalid': error.password_new_1
                })}
                name='password_new_1'
                value={this.state.password_new_1}
                onChange={this.onChange}
                placeholder='Enter new password'
              />
              {error.password_new_1 && (
                <div className='invalid-feedback'>{error.password_new_1}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='password'>Repeat password</label>
              <input
                type='password'
                className={classnames('form-control', {
                  'is-invalid': error.password_new_2
                })}
                name='password_new_2'
                value={this.state.password_new_2}
                onChange={this.onChange}
                placeholder='Repeat new password'
              />
              {error.password_new_2 && (
                <div className='invalid-feedback'>{error.password_new_2}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content--button'>
              <button type='submit' className='btn btn-primary btn-lg'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Type-checking
ChangePassword.propTypes = {
  error: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
  // successMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(withRouter(ChangePassword));
