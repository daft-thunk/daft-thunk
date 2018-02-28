import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProduct } from '../store';

const ProductCard = (props) => {
  // TODO set up onclick for add to cart
  return (
    <Card onClick={props.handleClick} link as={Link} to={`/products/${props.product.id}`}>
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
        <Card.Description>
        {props.product.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Icon name="dollar" />
          {props.product.price}
          <Button fluid animated="vertical">
      <Button.Content hidden>Add to Cart</Button.Content>
      <Button.Content visible>
        <Icon name="shop" />
      </Button.Content>
    </Button>
      </Card.Content>
    </Card>
  );
};

const mapProps = () => ({});

const mapDispatch = (dispatch, ownProps) => ({
  handleClick(){
    dispatch(setProduct(ownProps.product));
  }
});

const Container = connect(mapProps, mapDispatch)(ProductCard);


export default Container;
