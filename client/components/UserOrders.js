import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/orders';

import OrderDetail from './OrderDetail';
// import { ProductSearch, ProductSelector, ProductCard } from './index';

class UserOrders extends Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.userId);
  }

  render() {

    if (!this.props.userId) {
      return <h3>Loading...</h3>;
    }
    let userOrders = this.props.orders;
    return (
      <div>
        <h3>Your orders:</h3>
        <div>
          {userOrders.map(order => {
            console.log(order.products)
            return (
              <div key={order.id} className="flex">
                <ul style={{marginRight: 10}}>
                  <li>Email: {order.email}</li>
                  <li>Mailing Address: {order.mailingAddress}</li>
                  <li>Status: {order.status}</li>
                  <li>Date Ordered: {order.dateOrdered.toString()}</li>
                  <li>Date Shipped: {order.dateShipped ? order.dateShipped.toString() : 'Has Not Shipped'}</li>
                  <li>Date Arrived: {order.dateArrived ? order.dateArrived : 'Has Not Arrived'}</li>
                </ul>
                <OrderDetail products={order.purchasedCart.products} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapProps = state => ({
  userId: state.user.id,
  orders: state.orders
});

const mapDispatch = dispatch => {
  return {
    getUserOrders(userId) {
      dispatch(getUserOrders(userId));
    }
  };
};

const Container = connect(mapProps, mapDispatch)(UserOrders);

export default Container;
