import React from 'react';
import { connect } from 'react-redux';
import { Carousel, ProductCard } from './index';

export default function(){
  return (
    <div>
      <Carousel className="carousel"/>
      <div className="featured">
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
        <div>
          <ProductCard />
        </div>
      </div>
    </div>
  )
}
