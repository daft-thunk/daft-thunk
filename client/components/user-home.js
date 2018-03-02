import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UserOrders from './UserOrders';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  console.log('user home props:', props);
  const {email} = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
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
    userId: state.user.id
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
