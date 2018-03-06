import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getOrdersThunk, changeOrderThunk } from '../store/orders';
import OrderDetail from './OrderDetail';
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

  static getOrderTotal(cart) {
    function totalReducer(acc, curProduct) {
      let price = curProduct.price * curProduct.cart_to_product.quantity;
      return acc + price;
    }
    let total = cart.products !== undefined ? cart.products.reduce(totalReducer, 0) : 0;
    return total;
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleSubmit = (evt, orderId, orderStatus, order) => {
    evt.preventDefault();
    const status = this.state.changeOrderStatus;
    console.log('status / orderId', status, orderId);
    console.log('user', order.user.fullName);
    if (status === 'Processing') {
      console.log('sending email!')
      window.emailjs.send("sendgrid", "1", {"email":"carlson.joshuaph@gmail.com","user": order.user.fullName})
    }

    if (status === 'Completed') {
      console.log('firing completed email')
      window.emailjs.send("sendgrid", "2", {"email":"carlson.joshuaph@gmail.com", "user": order.user.fullName})
    }

    if (status === '' || status === orderStatus) return;
    // else, save the new status to db
    this.props
      .changeOrder({ status, id: orderId })
      .then(() => {
        const updatedFilteredOrders = this.state.filteredOrders.filter(order => {
          return order.id !== orderId;
        });
        if (updatedFilteredOrders.length) {
          this.setState({filteredOrders: updatedFilteredOrders});
        } else {
          this.setState({filteredOrders: [], status: 'All'});
        }
      })
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
          {
            this.state.status !== 'All' && !ordersToDisplay.length ?
            <h4>No {this.state.status} orders to display.</h4> :
            ordersToDisplay
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
                    <Table.HeaderCell>Order ID</Table.HeaderCell>
                    <Table.HeaderCell>User ID</Table.HeaderCell>
                    <Table.HeaderCell>User Email</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Cart ID</Table.HeaderCell>
                    <Table.HeaderCell>Date Ordered</Table.HeaderCell>
                    <Table.HeaderCell>Date Shipped</Table.HeaderCell>
                    <Table.HeaderCell>Date Arrived</Table.HeaderCell>
                    <Table.HeaderCell>Mailing Address</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{order.id}
                    <br />
                    {
                      // we can remove this logic later
                      order.purchasedCart &&
                      <OrderDetail products={order.purchasedCart.products} orderDate={order.dateOrdered} total={this.getOrderTotal(order.purchasedCart)} />
                    }
                    </Table.Cell>
                    <Table.Cell>{order.userId}</Table.Cell>
                    <Table.Cell>{order.email}</Table.Cell>
                    <Table.Cell>
                      <h4>{order.status}</h4>
                      <br />
                      <Form
                        onSubmit={evt => {
                          this.handleSubmit(evt, order.id, order.status, order);
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
