import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {SearchBar, ProductSelector} from './index';
import { SingleProduct } from './SingleProduct';

export function Products(props){
  return (
    <div>
    <h1> all the products</h1>
    <div className="flex">
      <SearchBar />
      <ProductSelector />
    </div>
      {
        //logic to not run for now
        props.products.map(product => {
          return (
            <div key={product.id}>
              <h1>{product.name} - for now</h1>
              <SingleProduct activeProduct={product} />
            </div>
          );
        })
      }
    </div>
  );
}

const mapProps = state => ({
  products: state.products
});

const mapDispatch = null;

const Container = connect(mapProps, mapDispatch)(Products);

export default Container;

