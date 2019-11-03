import React, { Component } from 'react';
// Import type-checking
import PropTypes from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// import actions from userActions
import { usersDetail } from '../../actions/userActions';
// Import UserItem component
import UserItem from './UserItem';

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {}
    };
  }

  componentDidMount() {
    this.props.usersDetail();
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.users) {
      this.setState({ users: nextProps.users });
    }
  };

  render() {
    const { users } = this.state.users;

    if (!users) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h2>Users: </h2>

          {users.map(user => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      );
    }
  }
}

// Type-checking
Users.propTypes = {
  usersDetail: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

// Making props out of states to use in component
const mapStateToProps = state => ({
  users: state.user
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { usersDetail }
)(Users);
