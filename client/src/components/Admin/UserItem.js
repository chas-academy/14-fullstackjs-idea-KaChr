import React, { Component } from 'react';
// Import type-checking
import PropTypes from 'prop-types';

class UserItem extends Component {
  render() {
    const { user } = this.props;

    if (Object.keys(user).length === 0) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
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

// Type-checking
UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
