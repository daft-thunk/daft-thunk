import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getOrdersThunk } from '../store/orders';
import store from '../store';
import { Button, Form } from 'semantic-ui-react';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOrders: [],
      status: 'All'
    };
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleChange = (evt) => {
    evt.preventDefault();
    const status = evt.target.value;
    if (status === 'All') {
      this.setState({filteredOrders: [], status});
    } else {
      const filteredOrders = this.props.orders.filter(order => {
        return order.status === status;
      });
      this.setState({filteredOrders, status}, () => {
        // console.log(this.state);
      });
    }
  }

  render() {
    let allOrders = this.props.orders;
    let filteredOrders = this.state.filteredOrders;
    const ordersToDisplay = filteredOrders.length ? filteredOrders : allOrders;

    return (
      <div>
        <h1>Orders: Admin Panel</h1>
        <h3>{this.state.status} orders</h3>
        <Form.Field label="Filter orders by category:" control="select" onChange={this.handleChange}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Field>
        <div className="flex">
          {ordersToDisplay.map(order => {
            if (order.purchasedCart) {
              console.log('cart', order.purchasedCart);
            }
            return (
              <ul key={order.id}>
                <li>User Id: {order.userId}</li>
                <li>User Email: {order.email}</li>
                <li>Status: {order.status}</li>
                <li>Cart Id:{order.cartId}</li>
                <li>Date Ordered: {order.dateOrdered}</li>
                <li>Date Shipped: {order.dateShipped}</li>
                <li>Date Arrived: {order.dateArrived}</li>
                <li>Mailing Address: {order.mailingAddress}</li>
              </ul>
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

const Container = connect(mapProps, mapDispatch)(Orders);

export default Container;
