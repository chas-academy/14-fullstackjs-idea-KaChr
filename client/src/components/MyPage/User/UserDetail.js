import React, { Component } from 'react';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// Import router
import { withRouter } from 'react-router-dom';
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
          <h2>UserDetail component</h2>
          <table className={'table table-dark'}>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>email</th>
                <th>adress</th>
                <th>zipcode</th>
                <th>phone</th>
                <th>admin</th>
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
                <td>{user.admin.toString() || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { userDetail }
)(withRouter(UserDetail));
