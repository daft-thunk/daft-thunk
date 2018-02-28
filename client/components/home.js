import React from 'react';
import { connect } from 'react-redux';
import { Carousel, ProductCard, ShippingForm } from './index';

function Home(props){
  return (
    <div>
      <Carousel className="carousel"/>
      {
        props.products.length &&
        <div className="featured">
        <div>
          <ProductCard product={props.products[0]} />
        </div>
        <div>
          <ProductCard product={props.products[1]} />
        </div>
        <div>
          <ProductCard product={props.products[2]} />
        </div>
        <div>
          <ProductCard product={props.products[3]} />
        </div>
      </div>
      }
      <ShippingForm />
    </div>
  )
}

const mapProps = state => ({
  products: state.products
})

const Container = connect(mapProps)(Home);

export default Container;
