import React from 'react';
import { Form, Radio, Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {changeUserThunk} from '../store/users';
// import { setProduct, addProductToCart } from '../store';

class UserCard extends React.Component {
  state = {
    value: this.props.user.role
  }
  checkedBool = (val) => {
    return this.state.value === val;
  }

  handleChange = (e, { value }) => {
    this.props.changeUserRole({role: value, id: this.props.user.id})
    .then(() => {
      this.setState({ value }, () => {
        console.log('changed. state', this.state);
      });
    })
    .catch(console.error);
  }

  render() {
    // console.log('user card', this.props);
    const { user } = this.props;
    return (
      <Card raised style={{ margin: '0 5px 10px 5px'}}>
        <Card.Content>
          <Card.Content>
            <Card.Header>
              <div className="flex" style={{ justifyContent: 'space-around' }}>
                <Icon name="user" size="big" />
                user.fullName
                <Icon
                  link
                  name="close"
                  size="big"
                  onClick={() => {
                    console.log('clicked!');
                  }} />
              </div>
            </Card.Header>
          </Card.Content>
          <Card.Meta>
            <span className="date">#{user.id}</span>
          </Card.Meta>
          <Card.Content>{user.email}</Card.Content>
          <Card.Content>user.mailingAddress</Card.Content>
          <Card.Content>
            <Form>
              <Form.Field style={{display: 'block'}}>
              <b>Role: {this.state.value}</b>
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Admin"
                  name="radioGroup"
                  value="admin"
                  checked={this.checkedBool('admin')}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="User"
                  name="radioGroup"
                  value="user"
                  checked={this.checkedBool('user')}
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
  changeUserRole(user){
    return dispatch(changeUserThunk(user));
  },
  // handleAddToCart(cartId, productId) {
  //   dispatch(addProductToCart(cartId, { productId } ));
  // }
});

const Container = connect(mapProps, mapDispatch)(UserCard);

export default Container;
