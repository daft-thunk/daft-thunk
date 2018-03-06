import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Button } from 'semantic-ui-react';

//Currently using this carousel (1024 x 524)
export default class altCarousel extends Component {
  render() {
    return (
      <Carousel className="main-carousel" showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={5000} transitionTime={500}>
        <div className="slide">
          <img className="cover-img" src="/images/cover1.jpg" />
          <div>
            <h1 className="legend text-align">Shredding the Competition</h1>
          </div>
          <Button className="car-btn" inverted color='grey'>View All Products</Button>
        </div>
        <div className="slide">
          <img className="cover-img" src="/images/cover2.jpg" />
          <div>
            <h1 className="legend text-align"><span>Un<i>beat</i>able Drum Prices</span></h1>
            </div>
            <Button className="car-btn" inverted color='grey'>View All Products</Button>
        </div>
        <div className="slide">
          <img className="cover-img" src="/images/cover3.jpg" />
          <div className="thirdslide">
            <h1 className="legend">Top Line Synths</h1>
          </div>
          <Button className="car-btn" inverted color='grey'>View All Products</Button>
        </div>
      </Carousel>
    );
  }
}


//http://www.guitar-academy.com/wallpapers.asp
// http://www.collingsguitars.com/img/home/t-series-2017-alt.jpg
