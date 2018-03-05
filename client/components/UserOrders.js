import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/orders';
import { List } from 'semantic-ui-react';

import OrderDetail from './OrderDetail';
// import { ProductSearch, ProductSelector, ProductCard } from './index';

class UserOrders extends Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.userId);
  }

  getOrderTotal(cart) {
    function totalReducer(acc, curProduct) {
      let price = curProduct.price * curProduct.cart_to_product.quantity;
      return acc + price;
    }

    let total = cart.products !== undefined ? cart.products.reduce(totalReducer, 0) : 0;

    return total;
  }

  render() {

    if (!this.props.userId) {
      return (
        <h3>Loading...</h3>
      );
    }
    let userOrders = this.props.orders;
    // console.log('userOrders:', userOrders);
    return (
      <div>
      {
        userOrders.length ?
        <h3>Your orders:</h3>
        :
        <h3>No past orders to display. <Link to="/">View our featured products.</Link></h3>
      }
        <div>
          {userOrders.map(order => {
            // console.log(order.purchasedCart);
            return (
              <div key={order.id}>
              <List celled>
                <List.Item><span className="bold" >Ordered: {order.dateOrdered.substring(0, 10)} </span>
                  <List.List>
                    <List.Item>Status: <span className="bold" >{order.status}</span></List.Item>
                    <List.Item>Shipped: <span className="bold" >{order.dateShipped ? order.dateShipped.substring(0, 10) : 'Has Not Shipped'}</span></List.Item>
                    <List.Item>Arrived: <span className="bold" >{order.dateArrived ? order.dateArrived.substring(0, 10) : 'Has Not Arrived'}</span></List.Item>
                    <List.Item>Mailing Address: <span className="bold" >{order.mailingAddress}</span></List.Item>
                  </List.List>
                  <OrderDetail products={order.purchasedCart.products} orderDate={order.dateOrdered} total={this.getOrderTotal(order.purchasedCart)} />
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
