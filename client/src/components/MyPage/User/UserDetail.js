import React, { Component } from 'react';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// Import router
import { withRouter } from 'react-router-dom';
// import actions from userActions
import { userDetail, userEditRole } from '../../../actions/userActions';

export class UserDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.userDetail(this.props.match.params.id);
    }
  }

  handleInput = e => {
    e.preventDefault();

    const isAdmin = { admin: e.target.value };
    this.setState(isAdmin);

    this.props.userEditRole(
      this.props.match.params.id,
      isAdmin,
      this.props.history
    );
  };

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
                <th>Role</th>
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
                <td>
                  <div className='dropdown'>
                    <button
                      className='btn btn-secondary btn-sm dropdown-toggle'
                      type='button'
                      id='dropdownMenu2'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      Change role
                    </button>
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenu2'
                    >
                      <button
                        className='dropdown-item'
                        type='button'
                        onClick={this.handleInput.bind(this)}
                        value='false'
                      >
                        User
                      </button>
                      <button
                        className='dropdown-item'
                        type='button'
                        onClick={this.handleInput.bind(this)}
                        value='true'
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

// Type-checking
UserDetail.propTypes = {
  userDetail: PropTypes.func.isRequired,
  userEditRole: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
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
  user: state.user.user
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { userDetail, userEditRole }
)(withRouter(UserDetail));
