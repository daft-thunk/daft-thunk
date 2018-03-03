import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getOrdersThunk, changeOrderThunk } from '../store/orders';
import store from '../store';
import { Button, Form, Table } from 'semantic-ui-react';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOrders: [],
      status: 'All',
      changeOrderStatus: ''
    };
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleSubmit = (evt, orderId, orderStatus) => {
    evt.preventDefault();
    const status = this.state.changeOrderStatus;
    console.log('status / orderId', status, orderId);
    if (status === '' || status === orderStatus) return;
    // else, save the new status to db
    this.props
      .changeOrder({ status, id: orderId })
      .then(() => {
        this.props.fetchOrders();
      })
      .catch(console.error);
  };

  handleOrderStatusChange = evt => {
    const status = evt.target.value;
    this.setState({ changeOrderStatus: status }, () => {
      // console.log(this.state);
    });
  };

  handleViewChange = evt => {
    const status = evt.target.value;
    if (status === 'All') {
      this.setState({ filteredOrders: [], status });
    } else {
      const filteredOrders = this.props.orders.filter(order => {
        return order.status === status;
      });
      this.setState({ filteredOrders, status }, () => {
        // console.log(this.state);
      });
    }
  };

  render() {
    let allOrders = this.props.orders;
    let filteredOrders = this.state.filteredOrders;
    const ordersToDisplay = filteredOrders.length ? filteredOrders : allOrders;
    // console.log('state:', this.state);
    return (
      <div>
        <h1>Orders: Admin Panel</h1>
        <h3>{this.state.status} orders</h3>
        <Form.Field
          label="Filter orders by category:"
          control="select"
          onChange={this.handleViewChange}
        >
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Field>
        <div className="">
          {ordersToDisplay
            .sort((a, b) => {
              return a.id > b.id;
            })
            .map(order => {
            if (order.purchasedCart) {
              // console.log('cart', order.purchasedCart);
            }
            return (
              <Table celled key={order.id}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Order Id</Table.HeaderCell>
                    <Table.HeaderCell>User Id</Table.HeaderCell>
                    <Table.HeaderCell>User Email</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Cart Id</Table.HeaderCell>
                    <Table.HeaderCell>Date Ordered</Table.HeaderCell>
                    <Table.HeaderCell>Date Shipped</Table.HeaderCell>
                    <Table.HeaderCell>Date Arrived</Table.HeaderCell>
                    <Table.HeaderCell>Mailing Address</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.userId}</Table.Cell>
                    <Table.Cell>{order.email}</Table.Cell>
                    <Table.Cell>
                      <h4>{order.status}</h4>
                      <br />
                      <Form
                        onSubmit={evt => {
                          this.handleSubmit(evt, order.id, order.status);
                        }}
                      >
                        <Form.Field
                          label=""
                          control="select"
                          onChange={this.handleOrderStatusChange}
                        >
                          <option value="">--Change Status--</option>
                          <option value="Created">Created</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </Form.Field>
                        <Form.Button type="submit">Save Changes</Form.Button>
                      </Form>
                    </Table.Cell>
                    <Table.Cell>{order.cartId}</Table.Cell>
                    <Table.Cell>{order.dateOrdered}</Table.Cell>
                    <Table.Cell>{order.dateShipped}</Table.Cell>
                    <Table.Cell>{order.dateArrived}</Table.Cell>
                    <Table.Cell>{order.mailingAddress}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
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
      return dispatch(getOrdersThunk());
    },
    changeOrder(order) {
      return dispatch(changeOrderThunk(order));
    }
  };
};

const Container = connect(mapProps, mapDispatch)(Orders);

export default Container;
