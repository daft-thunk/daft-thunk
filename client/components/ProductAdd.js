import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Message } from 'semantic-ui-react';
import { createProductThunk } from '../store/products';
// import PropTypes from 'prop-types';

class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validate(arr) {
    let valid = true;
    arr.forEach(item => {
      if (!item || item === '') {
        this.setState({ error: true });
        valid = false;
      }
    });
    return valid;
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      price,
      inventory,
      description,
      imageUrl,
      manufacturer
    } = this.state;
    if (!this.validate([name, price, inventory])) return;

    this.props
      .createProduct({
        name,
        price,
        inventory,
        description,
        imageUrl,
        manufacturer
      })
      .then(() => {
        // set expected keys to ''
        Object.keys(this.state).forEach(key => {
          if (
            [
              'name',
              'price',
              'description',
              'imageUrl',
              'manufacturer',
              'inventory'
            ].indexOf(key) > -1
          ) {
            this.setState({ [key]: '' });
          }
        });
      });
  };

  render() {
    // console.log('PROPS', this.props)
    const {
      name,
      price,
      description,
      imageUrl,
      manufacturer,
      inventory
    } = this.state;

    return (
      <div>
        <h3>{JSON.stringify(this.state, null, 2)}</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label="Product Name (Required)"
              placeholder="Product Name (Required)"
              name="name"
              value={name === '' ? 'product name' : name}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Price"
              placeholder="Price"
              name="price"
              value={price}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Manufacturer"
              placeholder="Manufacturer"
              name="manufacturer"
              value={manufacturer}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Description"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Input
              label="Image URL"
              placeholder="Image URL"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Inventory # in Stock"
              placeholder="Inventory # in Stock"
              name="inventory"
              value={inventory}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.error && (
            <Message
              error={this.state.error}
              header="Please fill out all required fields"
              content=""
            />
          )}
          <Form.Button content="Submit" />
        </Form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    // cart: state.cart,
    // user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    createProduct(product) {
      return dispatch(createProductThunk(product));
    }
  };
};

export default connect(mapState, mapDispatch)(ProductAdd);
