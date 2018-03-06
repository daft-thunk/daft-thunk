import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, TextArea, Message, Select } from 'semantic-ui-react';
import { createProductThunk, updateProductThunk } from '../store/products';
import { fetchCategories, createCategory } from '../store/categories';
// import PropTypes from 'prop-types';

class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      product: false
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  getProductData() {
    let productData;
    // console.log(
    //   this.props.match.params.id,
    //   this.props.products.allProducts.length
    // );
    if (this.props.match.params.id && this.props.products.allProducts.length) {
      console.log('i am in');
      productData = this.props.products.allProducts.find(product => {
        return product.id === +this.props.match.params.id;
      });
    }
    // console.log('product data', productData)
    return productData;
  }

  prefillForm = (field, product) => {
    if (product) {
      return product[field];
    } else {
      return '';
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleCategoryChange = (e, { value }) => {
    console.log('value', value);
    this.setState({ category: value });
  };

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
  handleCategoryAddSubmit = (e) => {
    e.preventDefault();
    const { category } = this.state;
    if (!category || !this.props.match.params.id) return;
    this.props.addCategory({name: category, productId: this.props.match.params.id});
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
              'inventory',
              'category'
            ].indexOf(key) > -1
          ) {
            this.setState({ [key]: '' });
          }
        });
      });
  };

  render() {
    console.log('PROPS', this.props);
    // console.log('state:', this.state);

    const categories = this.props.categories
      ? this.props.categories.map(cat => {
          return {
            key: cat.id,
            text: cat.name,
            value: cat.name
          };
        })
      : [];

    const {
      name,
      price,
      description,
      imageUrl,
      manufacturer,
      inventory,
      category
    } = this.state;

    const productData = this.getProductData();
    console.log('product data', productData);
    console.log('return prefill:', this.prefillForm('name', productData));

    return (
      <div>
        <h3>{JSON.stringify(this.state, null, 2)}</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label="Product Name (Required)"
              defaultValue={this.prefillForm('name', productData)}
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Price (Required)"
              defaultValue={this.prefillForm('price', productData)}
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
              label="Inventory # in Stock (Required)"
              placeholder="Inventory # in Stock"
              name="inventory"
              value={inventory}
              onChange={this.handleChange}
            />
          </Form.Group>
          <h3>Current Categories</h3>
          {
            productData && productData.categories.length ?
            productData.categories.map(cat => {
              return (
                <h4 key={cat.id}>{cat.name}</h4>
              );
            })
            : <h4>None</h4>
          }
          <Form.Field
            control={Select}
            onChange={this.handleCategoryChange}
            options={categories}
            placeholder="Add a new category"
            selection
            value={category}
          />
          <Button content="Add Category to Product" onClick={this.handleCategoryAddSubmit} />
          <br />
          <Form.Button content="Submit" />
        </Form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    products: state.products,
    activeProduct: state.activeProduct,
    categories: state.categories
  };
};

const mapDispatch = dispatch => {
  return {
    createProduct(product) {
      return dispatch(createProductThunk(product));
    },
    createCategory(category) {
      return dispatch(createCategory(category));
    },
    addCategory(category) {
      return dispatch(updateProductThunk(category));
    },
    fetchCategories() {
      return dispatch(fetchCategories());
    }
  };
};

export default connect(mapState, mapDispatch)(ProductAdd);
