import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Orders} from './Orders';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h3>Your user id: {props.userId}</h3>
      <h3>Your orders:</h3>
      <Orders userId={props.userId} />
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
