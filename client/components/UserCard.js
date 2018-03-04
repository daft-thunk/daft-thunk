import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { setProduct, addProductToCart } from '../store';

const UserCard = () => (
  <Card raised>
    <Card.Content>
      <Card.Content>
        <Card.Header>
        <div className="flex" style={{justifyContent: 'space-around'}}>
          <Icon name="user" size="big" />
          user.fullName
          <Icon link name="close" size="big" />
        </div>
        </Card.Header>
      </Card.Content>
      <Card.Meta>
        <span className="date">#user.id</span>
      </Card.Meta>
      <Card.Content>user.email</Card.Content>
      <Card.Content>user.mailingAddress</Card.Content>
      <Card.Content>user.role | radio buttons | Change (button)</Card.Content>
    </Card.Content>
  </Card>
);

const mapProps = state => ({
  // cartId: state.cart.id
});

const mapDispatch = (dispatch, ownProps) => ({
  // handleClick(){
  //   dispatch(setProduct(ownProps.product));
  // },
  // handleAddToCart(cartId, productId) {
  //   dispatch(addProductToCart(cartId, { productId } ));
  // }
});

const Container = connect(mapProps, mapDispatch)(UserCard);

export default Container;
