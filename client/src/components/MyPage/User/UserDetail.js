import React, { Component } from 'react';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// Import router
import { Link, withRouter } from 'react-router-dom';
// import actions from userActions
import { userDetail } from '../../../actions/userActions';

export class UserDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.userDetail(this.props.match.params.id);
    }
  }

  render() {
    const { user } = this.props;

    if (Object.keys(user).length === 0) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h2>My information</h2>
          <div className={'table-responsive-md'}>
            <table className={'table table-dark'} id='table--info'>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>email</th>
                  <th>adress</th>
                  <th>zipcode</th>
                  <th>phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.adress}</td>
                  <td>{user.zipcode}</td>
                  <td>{user.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link className='link--user' to={`/user/edit/${user._id}`}>
            Change my information
          </Link>
        </div>
      );
    }
  }
}

// Type-checking
UserDetail.propTypes = {
  userDetail: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

// Making props out of states to use in component
const mapStateToProps = state => ({
  user: state.user.user
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { userDetail }
)(withRouter(UserDetail));
