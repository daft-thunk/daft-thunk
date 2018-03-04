import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UserOrders from './UserOrders';
import {Link} from 'react-router-dom';
import { Button, Header, Segment, Modal } from 'semantic-ui-react';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {
        props.role === 'admin' &&
        <div style={{margin: '0 0 10px 0'}}>
        <h1>Wanna do some admin stuff?</h1>
        <Button as={Link} to="/admin/orders">Manage Orders</Button>
        <Button as={Link} to="/admin/users">Manage Users</Button>
        <Button as={Link} to="/admin/products">Manage Products</Button>
        </div>
      }
      <UserOrders userId={props.userId} />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
    role: state.user.role
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
