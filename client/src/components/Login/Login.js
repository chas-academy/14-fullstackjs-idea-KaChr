import React, { Component } from 'react';
// To add addtitonal classnames
import classnames from 'classnames';
//Connecting redux to component
import { connect } from 'react-redux';
//import actions from authActions
import { userLogin } from '../../actions/authActions';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push('/');
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuth) {
      this.props.history.push('/');
    }
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const dataUser = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(dataUser);

    this.props.userLogin(dataUser, this.props.history);

  }

  render() {
    const { error } = this.state;

    return (
      <div id="login">
        <h2>Login:</h2>
        <form id="register--form" noValidate onSubmit={this.onSubmit}>
          <div className="form-group" id="register--form--content">
            <label htmlFor="email">Email address</label>
            <input type="email" className={classnames('form-control', { 'is-invalid': error.email })} name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter email" />
            {error.email && (<div className="invalid-feedback">{error.email}</div>)}
          </div>
          <div className="form-group" id="register--form--content">
            <label htmlFor="password">Password</label>
            <input type="password" className={classnames('form-control', { 'is-invalid': error.password })} name="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
            {error.password && (<div className="invalid-feedback">{error.password}</div>)}
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
export default connect(mapStateToProps, { userLogin })(Login);
