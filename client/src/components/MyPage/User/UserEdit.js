import React, { Component } from 'react';
// Import withRouter
import { withRouter } from 'react-router-dom';
// To add addtitonal classnames
import classnames from 'classnames';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// import actions from authActions & userActions
import { userEdit, getCurrentProfile } from '../../../actions/userActions';
// Check if field is empty with
const isEmpty = require('lodash/isEmpty');

export class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      adress: '',
      zipcode: '',
      phone: '',
      error: {}
    };
  }
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getCurrentProfile(this.props.match.params.id);
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (!isEmpty(nextProps.error)) {
      this.setState({ error: nextProps.error });
    }

    if (nextProps.user) {
      const user = nextProps.user;

      this.setState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        adress: user.adress,
        zipcode: user.zipcode,
        phone: user.phone
      });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const dataUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      adress: this.state.adress,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    };

    this.props.userEdit(
      this.props.match.params.id,
      dataUser,
      this.props.history
    );
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <div id='edit-user'>
          <h2>Change information</h2>
          <form id='register--form' onSubmit={e => this.onSubmit(e)}>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='first_name'>First name</label>
              <input
                type='text'
                className={classnames('form-control', {
                  'is-invalid': error.first_name
                })}
                name='first_name'
                value={this.state.first_name}
                onChange={this.onChange}
                placeholder='Enter first name'
              />
              {error.first_name && (
                <div className='invalid-feedback'>{error.first_name}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='last_name'>Last name</label>
              <input
                type='text'
                className={classnames('form-control', {
                  'is-invalid': error.last_name
                })}
                name='last_name'
                value={this.state.last_name}
                onChange={this.onChange}
                placeholder='Enter last name'
              />
              {error.last_name && (
                <div className='invalid-feedback'>{error.last_name}</div>
              )}
            </div>
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
              <label htmlFor='adress'>Address</label>
              <input
                type='text'
                className={classnames('form-control', {
                  'is-invalid': error.adress
                })}
                name='adress'
                value={this.state.adress}
                onChange={this.onChange}
                placeholder='Enter adress'
              />
              {error.adress && (
                <div className='invalid-feedback'>{error.adress}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='zipcode'>Postal code</label>
              <input
                type='text'
                className={classnames('form-control', {
                  'is-invalid': error.zipcode
                })}
                name='zipcode'
                value={this.state.zipcode}
                onChange={this.onChange}
                placeholder='Enter postal code'
              />
              {error.zipcode && (
                <div className='invalid-feedback'>{error.zipcode}</div>
              )}
            </div>
            <div className='form-group' id='register--form--content'>
              <label htmlFor='phone'>Phone number</label>
              <input
                type='tel'
                className={classnames('form-control', {
                  'is-invalid': error.phone
                })}
                name='phone'
                value={this.state.phone}
                onChange={this.onChange}
                placeholder='Enter phone number'
              />
              {error.phone && (
                <div className='invalid-feedback'>{error.phone}</div>
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
UserEdit.propTypes = {
  error: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  userEdit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

// Making props out of states to use in component
const mapStateToProps = state => ({
  error: state.error,
  user: state.user.user,
  auth: state.auth
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { userEdit, getCurrentProfile }
)(withRouter(UserEdit));
