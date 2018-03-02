import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrdersThunk } from '../store/orders';

import OrderDetail from './OrderDetail';
// import { ProductSearch, ProductSelector, ProductCard } from './index';

class UserOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {

    const cartSeed = {
      "id": 5,
      "createdAt": "2018-03-02T17:01:03.257Z",
      "updatedAt": "2018-03-02T17:01:03.257Z",
      "userId": null,
      "products": [
          {
              "id": 10,
              "name": "capacitor",
              "price": "228.14",
              "description": "Eaque omnis dignissimos cupiditate rerum adipisci earum. Nihil sint rem eum saepe soluta quasi aliquam tempore ut. A odit eligendi accusamus at harum. Culpa aut quia velit facere tenetur dolores.",
              "imageUrl": "/images/default-product.png",
              "manufacturer": "Kerluke, Lueilwitz and Beer",
              "stock": 5,
              "createdAt": "2018-03-02T16:25:01.233Z",
              "updatedAt": "2018-03-02T16:25:01.233Z",
              "cart_to_product": {
                  "quantity": 4,
                  "createdAt": "2018-03-02T17:15:29.591Z",
                  "updatedAt": "2018-03-02T17:15:42.293Z",
                  "cartId": 5,
                  "productId": 10
              }
          },
          {
              "id": 15,
              "name": "driver",
              "price": "580.88",
              "description": "Quae quis consequatur alias ipsum reprehenderit delectus harum harum. Sed in eaque nobis sed impedit et reprehenderit. Voluptas exercitationem rerum. Esse nobis voluptatem aut sapiente nihil eaque sint dicta ad. Vero perferendis similique expedita aut voluptatem repellendus blanditiis quasi laboriosam. Quo in rerum et hic et modi aspernatur veniam aut. Exercitationem nam doloremque voluptas totam voluptas error.",
              "imageUrl": "/images/default-product.png",
              "manufacturer": "Hyatt - Haag",
              "stock": 2,
              "createdAt": "2018-03-02T16:25:01.233Z",
              "updatedAt": "2018-03-02T16:25:01.233Z",
              "cart_to_product": {
                  "quantity": 2,
                  "createdAt": "2018-03-02T17:15:33.894Z",
                  "updatedAt": "2018-03-02T17:15:40.096Z",
                  "cartId": 5,
                  "productId": 15
              }
          },
          {
              "id": 25,
              "name": "bandwidth",
              "price": "178.78",
              "description": "Quo quia consequatur. Et mollitia autem nihil assumenda repudiandae necessitatibus minus quam et. Aut deleniti quia neque nihil. Ullam maxime inventore labore quia a atque. Occaecati nihil et et dolorum.",
              "imageUrl": "/images/default-product.png",
              "manufacturer": "Olson, Lesch and Daugherty",
              "stock": 15,
              "createdAt": "2018-03-02T16:25:01.234Z",
              "updatedAt": "2018-03-02T16:25:01.234Z",
              "cart_to_product": {
                  "quantity": 2,
                  "createdAt": "2018-03-02T17:07:36.763Z",
                  "updatedAt": "2018-03-02T17:09:07.081Z",
                  "cartId": 5,
                  "productId": 25
              }
          }
      ]
  }

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
                <OrderDetail products={cartSeed.products} />
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
