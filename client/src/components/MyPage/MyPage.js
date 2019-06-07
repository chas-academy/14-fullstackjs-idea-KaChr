import React, { Component } from 'react';
// Import react router
import { Link, withRouter } from 'react-router-dom';
// Connecting redux to component
import { connect } from 'react-redux';
// Import type-checking
import { PropTypes } from 'prop-types';
// import actions from userActions
import { userDetail } from '../../actions/userActions';

export class MyPage extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <nav className='col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar'>
              <ul className='nav nav-pills flex-column'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/#'>
                    Dashboard
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={`/users/${user.id}`}>
                    User details
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={`/users/edit/${user.id}`}>
                    User edit
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <main role='main' className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
            <h2>My page</h2>
            <h1 className='h2'>Dashboard</h1>
            <div className='btn-toolbar mb-2 mb-md-0' />
          </div>
        </main>
      </div>
    );
  }
}

MyPage.propTypes = {
  userDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { userDetail }
)(withRouter(MyPage));
