import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getOrdersThunk, changeOrderThunk } from '../store/orders';
import { getUsersThunk, changeUserThunk } from '../store/users';
import UserCard from './UserCard';
// import { Button, Form, Table } from 'semantic-ui-react';

class Users extends Component {
  // CHANGE ALL BELOW
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const users = this.props.users;
    const admins = users.filter(user => {
      return user.role === 'admin';
    });
    const usersWithUserRole = users.filter(user => {
      return user.role === 'user';
    });
    // console.log('USERS:', users);
    return (
      <div>
        <h2>Admins:</h2>
        <div
          className="flex"
          style={{ flexWrap: 'wrap', justifyContent: 'space-around' }}
        >
          {admins.map(user => {
            return (
              <div key={user.id}>
                <UserCard user={user} />
              </div>
            );
          })}
        </div>
        <h2>Users:</h2>
        <div
          className="flex"
          style={{ flexWrap: 'wrap', justifyContent: 'space-around' }}
        >
          {usersWithUserRole.map(user => {
            return (
              <div key={user.id}>
                <UserCard user={user} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapProps = state => ({
  users: state.users
});

const mapDispatch = dispatch => {
  return {
    fetchUsers() {
      return dispatch(getUsersThunk());
    }
    //   changeOrder(order) {
    //     return dispatch(changeOrderThunk(order));
    //   }
  };
};

const Container = connect(mapProps, mapDispatch)(Users);

export default Container;
