import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProductSegment from './CartProductSegment';
import { fetchCart } from '../store/cart';
import axios from 'axios';

class Cart extends Component {
  constructor() {
    super();
    this.state = {};

    this.addOneToQuanity = this.addOneToQuanity.bind(this);
  }

  componentDidMount() {
    const cartId = 1; // TESTING PURPOSES ONLY
    this.props.fetchCart(cartId);
  }

  addOneToQuanity (event, quantity, productId) {
    event.preventDefault();
    quantity++;
    axios.put(`/api/cart/${this.props.cart.id}`, {productId, quantity})
    .then(console.log)
    .catch(console.error);
  }

  render() {
    // add up cost for cart
    function reducer(acc, curProduct) {
      let price = curProduct.price * curProduct.cart_to_product.quantity;
      return acc + price;
    }

    let total = this.props.cart.products !== undefined ? this.props.cart.products.reduce(reducer, 0) : 0;

    return (
      <div>
        <h1>Cart</h1>
        {
          this.props.cart.products !== undefined ? (
            this.props.cart.products.map(product => <CartProductSegment key={product.id} product={product} addOne={this.addOneToQuanity} />)
          ) : <h2>Cart is Empty</h2>
        }
        <div className="total">
          <h3>Total {total.toFixed(2)}</h3>
        </div>
      </div>
    );
  }
}

const mapProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    fetchCart(cartId) {
      dispatch(fetchCart(cartId));
    }
  };
};

const Container = connect(mapProps, mapDispatch)(Cart);

export default Container;
