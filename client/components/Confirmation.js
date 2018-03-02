import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


/**
 * COMPONENT
 */
export const UserHome = (props) => {

  return (
    <div>
      <h1>Thank You For Your Order!</h1>
      <h6>Our robot minions are working on your order. They will email you updates regarding your purchase shortly</h6>
      <div>
        <Button as={Link} to="/" color="google plus">Return Home</Button>
        <Button as={Link} to="/home" color="blue">View Order History</Button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.user.id
  };
};

export default connect(mapState)(UserHome);

