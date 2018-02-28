import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const CartProductCard = (props) => {
  // TODO set up onclick for add to cart
  return (
    <Card link as={Link} to={`/products/${props.product.id}`}>
      <Image src={props.product.imageUrl} />
      <Card.Content>
        <Card.Header>
          {props.product.name}
        </Card.Header>
        <Card.Meta>
          <span>
            category n/a
          </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Icon name="dollar" />
        {props.product.price}
        <div className="ui buttons">
          <button className="ui button">+</button>
          <button className="ui button">-</button>
          <button className="ui button">
            <i className="trash alternate outline icon" />
          </button>
        </div>
      </Card.Content>
    </Card>
  );
};


export default CartProductCard;
