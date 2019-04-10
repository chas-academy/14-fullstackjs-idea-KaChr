import React, { Component } from 'react';

export class Register extends Component {
  render() {
    return (
      <div id="register">
        <h2>Register:</h2>
        <form id="register--form">
          <div className="form-group" id="register--form--content">
            <label htmlFor="first-name">First name</label>
            <input type="text" className="form-control" placeholder="Enter first name" />
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="last-name">Last name</label>
            <input type="text" className="form-control" placeholder="Enter last name" />
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" placeholder="Enter address" />
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="postal-code">Postal code</label>
            <input type="text" className="form-control" placeholder="Enter postal code" />
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="phone-number">Phone number</label>
            <input type="tel" className="form-control" placeholder="Enter phone number" />
          </div>
          <div className="form-group" id="register--form--content--button">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register;
