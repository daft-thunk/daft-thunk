import React from 'react';
import { Form, Radio, Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { setProduct, addProductToCart } from '../store';

class UserCard extends React.Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    console.log('user card', this.props);
    const { user } = this.props;
    return (
      <Card raised style={{ margin: '0 5px 10px 5px' }}>
        <Card.Content>
          <Card.Content>
            <Card.Header>
              <div className="flex" style={{ justifyContent: 'space-around' }}>
                <Icon name="user" size="big" />
                user.fullName
                <Icon link name="close" size="big" />
              </div>
            </Card.Header>
          </Card.Content>
          <Card.Meta>
            <span className="date">#{user.id}</span>
          </Card.Meta>
          <Card.Content>{user.email}</Card.Content>
          <Card.Content>user.mailingAddress</Card.Content>
          <Card.Content>
            user.role | radio buttons | Change (button)
            <Form>
              <Form.Field>
                Selected value: <b>{this.state.value}</b>
              </Form.Field>
              <Form.Field>
                <Radio
                defaultChecked
                  label="User"
                  name="radioGroup"
                  value="user"
                  checked={this.state.value === 'user'}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Admin"
                  name="radioGroup"
                  value="admin"
                  checked={this.state.value === 'admin'}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

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
