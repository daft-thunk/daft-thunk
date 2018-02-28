import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CartProductSegment from './CartProductSegment';

export function Cart(props){

  // get static cart for testing

  return (
    <div>
      <h1>Cart</h1>
      {
        props.cart.products !== undefined ? (
          props.cart.products.map(product => <CartProductSegment key={product.id} product={product} />)
        ) : <h2>Cart is Empty</h2>
      }
      <div className="total">
        <h3>Total $300</h3>
      </div>
    </div>
  );
}

const mapProps = state => {
  return {
    cart: state.cart
  };
};

const Container = connect(mapProps)(Cart);

export default Container;
