import React from 'react';
import { Button, Segment, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const CartProductSegment = (props) => {
  // TODO set up onclick for add to cart
  return (
    <Segment vertical className="cart flex">
      <Image src={props.product.imageUrl} />
      <Link to={`/products/${props.product.id}`} >
        {props.product.name}
      </Link>
      <div className="cart-price">
        <Icon name="dollar" />
        {props.product.price}
      </div>
      <div className="flex cart-quantity">
        <div>
          Quantity <span>{props.product.cart_to_product.quantity}</span>
        </div>
        <div className="ui buttons">
          <button className="ui button">
            <i className="plus icon" />
          </button>
          <button className="ui button">
            <i className="minus icon" />
          </button>
          <button className="ui button">
            <i className="trash alternate outline icon" />
          </button>
        </div>
      </div>

    </Segment>
  );
};


export default CartProductSegment;
