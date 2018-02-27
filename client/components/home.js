import React from 'react';
import { connect } from 'react-redux';
import { Carousel, ProductCard } from './index';

export default function Home(props){
  return (
    <div>
      <Carousel className="carousel"/>
      <div className="featured">
        <div>
          <ProductCard product={props.product} />
        </div>
        <div>
          <ProductCard product={props.product} />
        </div>
        <div>
          <ProductCard product={props.product} />
        </div>
        <div>
          <ProductCard product={props.product} />
        </div>
      </div>
    </div>
  )
}

const mapProps = state => ({
  products: state.products
})

const Container = connect(mapProps)(Home);
