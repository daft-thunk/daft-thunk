import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../store';
import { OrderForm } from './index';

/**
 * COMPONENT
 */
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
      <OrderForm />
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapState = (state) => {
  return {
      cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, localState, cart) {
      const { email, address, city, state, zip } = localState;
     dispatch(addOrder({ email, mailingAddress: `${address} ${city}, ${state} ${zip}`, purchasedcart: cart }));
    }
  };
};

export default connect(mapState, mapDispatch)(Checkout);

