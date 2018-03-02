import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrdersThunk } from '../store/orders';
// import { ProductSearch, ProductSelector, ProductCard } from './index';

class UserOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    if (!this.props.userId) {
      return <h3>Loading...</h3>;
    }
    let userOrders = this.props.orders.filter(order => {
      return order.userId === this.props.userId;
    });
    return (
      <div>
        <h3>Your orders:</h3>
        <div>
          {userOrders.map(order => {
            let productList = [];
            if (order.purchasedCart) {
              // console.log('purchased cart', order.purchasedCart);
              const cart = order.purchasedCart;
              productList = cart.products.map(product => {
                return (
                  <div key={product.id} style={{marginLeft: 10}}>
                    <h4>{product.name}</h4>
                    <div>${product.price}</div>
                    <div>Quantity: {product.cart_to_product.quantity}</div>
                    <Link to={`/products/${product.id}`}>Leave a review</Link>
                  </div>
                );
              });
            }
            return (
              <div key={order.id} className="flex">
                <ul style={{marginRight: 10}}>
                  <li>Email: {order.email}</li>
                  <li>Mailing Address: {order.mailingAddress}</li>
                  <li>Cart Id:{order.cartId}</li>
                  <li>Status: {order.status}</li>
                  <li>Date Ordered: {order.dateOrdered}</li>
                  <li>Date Shipped: {order.dateShipped}</li>
                  <li>Date Arrived: {order.dateArrived}</li>
                </ul>
                <div className="flex" style={{ flexWrap: 'wrap' }}>
                  {productList}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapProps = state => ({
  orders: state.orders
});

const mapDispatch = dispatch => {
  return {
    fetchOrders() {
      dispatch(getOrdersThunk());
    }
  };
};

const Container = connect(mapProps, mapDispatch)(UserOrders);

export default Container;
