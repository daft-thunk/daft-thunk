import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/orders';
import { List } from 'semantic-ui-react'

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
              <div key={order.id}>
              <List celled>
                <List.Item>Ordered: {order.dateOrdered.substring(0,10)}
                  <List.List>
                    <List.Item>Status: {order.status}</List.Item>
                    <List.Item>Shipped: {order.dateShipped ? order.dateShipped.substring(0,10): 'Has Not Shipped'}</List.Item>
                    <List.Item>Arrived: {order.dateArrived ? order.dateArrived.substring(0,10) : 'Has Not Arrived'} </List.Item>
                    <List.Item>Mailing Address: {order.mailingAddress}</List.Item>
                  </List.List>
                  <OrderDetail products={order.purchasedCart.products} orderDate={order.dateOrdered} />
                </List.Item>
              </List>
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
