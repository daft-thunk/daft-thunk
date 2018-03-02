import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../store';
import { OrderForm } from './index';

/**
 * COMPONENT
 */
class Checkout extends Component {

  render() {


    return (
      <div>
      <OrderForm />
      </div>
    );
  }
}


const mapState = (state) => {
  return {
      cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Checkout);

