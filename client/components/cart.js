import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CartProductCard from './CartProductCard';

export function Cart(props){

  // get static cart for testing

  return (
    <div>
      <h1>Cart</h1>
      {
        props.cart.products.map(product => <CartProductCard key={product.id} product={product} />)
      }

    </div>
  );
}

const mapProps = state => ({
});

const Container = connect(mapProps)(Cart);

export default Container;
