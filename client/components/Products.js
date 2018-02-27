import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchBar, ProductSelector, ProductCard } from './index';

export function Products(props) {
  return (
    <div>
      <h1> all the products</h1>
      <div className="flex">
        <SearchBar />
        <ProductSelector />
      </div>
      <div className="flex all-products">
      {
      props.products.map(product => {
        return (
          <div className="product-card">
          <ProductCard key={product.id} product={product} />
          </div>
        );
      })}
    </div>
    </div>
  );
}

const mapProps = state => ({
  products: state.products
});

const mapDispatch = null;

const Container = connect(mapProps, mapDispatch)(Products);

export default Container;
