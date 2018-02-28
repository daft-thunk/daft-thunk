import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProduct } from '../store';

const ProductCard = (props) => {
  // TODO set up onclick for add to cart
  return (
    <Card>
      <Image src={props.product.imageUrl} />
      <Card.Content>
        <Card.Header>
          {props.product.name}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
          <Icon name="dollar" />
          {props.product.price}
          <Button onClick={props.handleClick} as={Link} to={`/products/${props.product.id}`} floated="right" color="google plus">View Product</Button>
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
