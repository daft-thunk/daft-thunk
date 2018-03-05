import React from 'react';
import { connect } from 'react-redux';
import { ProductCard, AltCarousel } from './index';
// <Carousel className="carousel"/>

export function Home(props){
  return (
    <div>
      <div className="altcarousel">
        <AltCarousel />
      </div>
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
    </div>
  );
}

const mapProps = state => ({
  products: state.products.allProducts
});

const Container = connect(mapProps)(Home);

export default Container;
