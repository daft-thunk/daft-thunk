import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Header, Segment, Modal } from 'semantic-ui-react';

const OrderDetail = (props) => (
  <Modal trigger={<Button className="order-detail-button">Order Detail</Button>}>
    <Modal.Header>{props.orderDate.substring(0, 10)}</Modal.Header>
    <Modal.Content>
      <Segment.Group>
        <Segment className="ui grid order-product">
          <Header className="four wide column">NAME</Header>
          <p className="four wide column">PRICE</p>
          <p className="four wide column">QUANTITY</p>
          <p className="two wide column">REVIEW</p>
        </Segment>
        {
          props.products.map(product => {
            return (
              <Segment key={product.id} className="ui grid order-product">
                <Header className="four wide column">{product.name}</Header>
                <p className="four wide column">${product.price}</p>
                <p className="four wide column">x{product.cart_to_product.quantity}</p>
                <Button as={Link} to={`/products/${product.id}`} className="two wide column">Rate Product</Button>
              </Segment>
            );
          })
        }
      </Segment.Group>
      <div className="ui grid">
        <p className="bold four wide column">Total:</p>
        <p className="four wide column">${props.total}</p>
      </div>
    </Modal.Content>
  </Modal>
);

export default OrderDetail;
