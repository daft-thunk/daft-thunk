import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getOrdersThunk } from '../store/orders';
import store from '../store';
// import { ProductSearch, ProductSelector, ProductCard } from './index';

class Orders extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchOrders();
    // store.dispatch(getOrdersThunk());
  }

  render() {
    let userOrders = this.props.orders || [];
    // console.log('userOrders and props:', this.props);
    if (this.props.userId) {
      // console.log('this.props.userId', this.props.userId);
      // NOT a secure way to filter...
      // const userId = this.props.userId;
      // userOrders = userOrders.filter(order => {
      //   return order.userId === userId;
      // });
    }
    let allOrders = this.props.orders;
    allOrders = allOrders.length ? allOrders : []
    console.log('all orders:', allOrders, this.props);
    return (
      <div>
        <h1>all the orders - admin view</h1>
        <div className="flex">
          {allOrders.map(order => {
            // object?
            console.log(order.purchasedCart);
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
