import React, { Component } from 'react';
//Import withRouter
import { withRouter } from 'react-router-dom';
// To add addtitonal classnames
import classnames from 'classnames';
//Connecting redux to component
import { connect } from 'react-redux';
//import actions from authActions
import { userRegister } from '../../actions/authActions';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      adress: '',
      zipcode: '',
      phone: '',
      error: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/');
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      adress: this.state.adress,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    };

    this.props.userRegister(newUser, this.props.history);
  }

  render() {
    const { error } = this.state;

    return (
      <div id="register">
        <h2>Register:</h2>
        <form id="register--form" noValidate onSubmit={this.onSubmit}>
          <div className="form-group" id="register--form--content">
            <label htmlFor="first_name">First name</label>
            <input type="text" className={classnames('form-control', { 'is-invalid': error.first_name })} name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="Enter first name" />
            {error.first_name && (<div className="invalid-feedback">{error.first_name}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="last_name">Last name</label>
            <input type="text" className={classnames('form-control', { 'is-invalid': error.last_name })} name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="Enter last name" />
            {error.last_name && (<div className="invalid-feedback">{error.last_name}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="email">Email adress</label>
            <input type="email" className={classnames('form-control', { 'is-invalid': error.email })} name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter email" />
            {error.email && (<div className="invalid-feedback">{error.email}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="password">Password</label>
            <input type="password" className={classnames('form-control', { 'is-invalid': error.password })} name="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
            {error.password && (<div className="invalid-feedback">{error.password}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="adress">Address</label>
            <input type="text" className={classnames('form-control', { 'is-invalid': error.adress })} name="adress" value={this.state.adress} onChange={this.onChange} placeholder="Enter adress" />
            {error.adress && (<div className="invalid-feedback">{error.adress}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="zipcode">Postal code</label>
            <input type="text" className={classnames('form-control', { 'is-invalid': error.zipcode })} name="zipcode" value={this.state.zipcode} onChange={this.onChange} placeholder="Enter postal code" />
            {error.zipcode && (<div className="invalid-feedback">{error.zipcode}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="phone">Phone number</label>
            <input type="tel" className={classnames('form-control', { 'is-invalid': error.phone })} name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Enter phone number" />
            {error.phone && (<div className="invalid-feedback">{error.phone}</div>)}
          </div>
          <div className="form-group" id="register--form--content--button">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

// Making props out of states to use in component
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

// Connects the variable with the action (connecting redux to the component)
export default connect(mapStateToProps, { userRegister })(withRouter(Register));
