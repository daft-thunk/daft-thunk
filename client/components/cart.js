import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProductSegment from './CartProductSegment';
import { fetchCart } from '../store/cart';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

class Cart extends Component {
  constructor() {
    super();

    this.addOneToQuanity = this.addOneToQuanity.bind(this);
    this.removeOneFromQuanity = this.removeOneFromQuanity.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    // const cartId = 1; // TESTING PURPOSES ONLY
    // this.props.fetchCart(cartId);
  }

  addOneToQuanity (event, quantity, productId) {
    event.preventDefault();
    quantity++;
    const cartId = this.props.cart.id;
    axios.put(`/api/cart/${cartId}`, {productId, quantity})
    .then((status) => {
      console.log(status);
      this.props.fetchCart(cartId);
    })
    .catch(console.error);
  }

  removeOneFromQuanity (event, quantity, productId) {
    event.preventDefault();
    quantity--;
    const cartId = this.props.cart.id;
    axios.put(`/api/cart/${cartId}`, {productId, quantity})
    .then((status) => {
      console.log(status);
      this.props.fetchCart(cartId);
    })
    .catch(console.error);
  }

  removeFromCart (event, productId) {
    event.preventDefault();
    axios.delete(`/api/cart/${this.props.cart.id}`, {
      data: { productId }
    })
    .then((status) => {
      console.log(status);
      this.props.fetchCart(this.props.cart.id);
    })
    .catch(console.error);
  }

  render() {
    // add up cost for cart
    function reducer(acc, curProduct) {
      let price = curProduct.price * curProduct.cart_to_product.quantity;
      return acc + price;
    }

    let total = this.props.cart.products !== undefined ? this.props.cart.products.reduce(reducer, 0) : 0;
    console.log(this.props.cart)
    return (
      <div>
        <h1>Cart</h1>
        {
          (this.props.cart.products && this.props.cart.products.length) ? (
            this.props.cart.products.map(product => <CartProductSegment key={product.id} product={product} addOne={this.addOneToQuanity} removeOne={this.removeOneFromQuanity} removeProduct={this.removeFromCart} />)
          ) : <h2>Cart is Empty</h2>
        }
        <div className="total">
          <h3>Total <span id="total-value">{total.toFixed(2)}</span></h3>
        </div>
        {
          (this.props.cart.products && this.props.cart.products.length)
          ? <Button as={Link} to="/checkout" >Checkout</Button>
          : <Button as={Link} to="/checkout" disabled>Checkout</Button>}
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
