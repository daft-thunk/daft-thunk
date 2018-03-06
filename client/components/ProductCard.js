import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProduct, addProductToCart } from '../store';

export const ProductCard = (props) => {
  // TODO set up onclick for add to cart
  return (
    <Card>
      <Image className="product-image" src={props.product.imageUrl} />
      <Card.Content>
        <Card.Header className="product-name">
          {props.product.name}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
          <Icon name="dollar" />
          <span className="price-number">{props.product.price}</span>
          <Button onClick={props.handleClick} as={Link} to={`/products/${props.product.id}`} floated="right" color="google plus">View Product</Button>
          <Button fluid animated="vertical">
      <Button.Content onClick={() => props.handleAddToCart(props.cartId, props.product.id)} hidden>Add to Cart</Button.Content>
      <Button.Content visible>
        <Icon name="shop" />
      </Button.Content>
    </Button>
      </Card.Content>
    </Card>
  );
};

const mapProps = (state) => ({
  cartId: state.cart.id
});

const mapDispatch = (dispatch, ownProps) => ({
  handleClick(){
    dispatch(setProduct(ownProps.product));
  },
  handleAddToCart(cartId, productId) {
    dispatch(addProductToCart(cartId, { productId } ));
  }
});

const Container = connect(mapProps, mapDispatch)(ProductCard);


export default Container;
