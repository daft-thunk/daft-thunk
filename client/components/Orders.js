import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getOrdersThunk } from '../store/orders';
import store from '../store';
import { Button, Form } from 'semantic-ui-react';
// import { ProductSearch, ProductSelector, ProductCard } from './index';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let allOrders = this.props.orders;
    console.log('all orders:', allOrders, this.props);

    return (
      <div>
        <h1>all the orders - admin view</h1>
        <Form.Field label="Filter orders by category:" control="select">
          <option value="Created">Created</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Field>
        <div className="flex">
          {allOrders.map(order => {
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

// export function Orders(props) {
//     let userOrders = props.orders ? props.orders : [];
//     console.log(userOrders, props);
//     if (props.userId) {
//       // NOT a secure way to filter...
//       const userId = props.userId;
//       userOrders = userOrders.filter(order => {
//         return order.userId === userId;
//       });
//     }

//     return (
//       <div>
//         <h1>all the orders - admin view</h1>
//         <div className="flex">
//           {userOrders.map(order => {
//             return (
//               <ul key={order.id}>
//                 <li>User Id: {order.userId}</li>
//                 <li>User Email: {order.email}</li>
//                 <li>Status: {order.status}</li>
//                 <li>Cart Id:{order.cartId}</li>
//                 <li>Date Ordered: {order.dateOrdered}</li>
//                 <li>Date Shipped: {order.dateShipped}</li>
//                 <li>Date Arrived: {order.dateArrived}</li>
//                 <li>Mailing Address: {order.mailingAddress}</li>
//               </ul>
//             );
//           })}
//         </div>
//       </div>
//     );
// }

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
