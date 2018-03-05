import React, { Component } from 'react';
import { Form, Radio, Button, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {changeUserThunk, deleteUserThunk} from '../store/users';

class UserCard extends Component {
  state = {
    value: this.props.user.role
  }
  checkedBool = (val) => {
    return this.state.value === val;
  }

  handleChange = (e, { value }) => {
    this.props.changeUserRole({role: value, id: this.props.user.id})
    .then(() => {
      this.setState({ value });
    })
    .catch(console.error);
  }

  handleDeleteUser = () => {
    this.props.deleteUser(this.props.user.id);
  }

  render() {
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
                  onClick={this.handleDeleteUser} />
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
  deleteUser(userId) {
    return dispatch(deleteUserThunk(userId));
  }
});

const Container = connect(mapProps, mapDispatch)(UserCard);

export default Container;
