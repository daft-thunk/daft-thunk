import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

//Currently using this carousel
export default class altCarousel extends Component {
  render() {
      return (
          <Carousel  showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={5000} transitionTime={500}>
              <div>
                  <img src="http://www.collingsguitars.com/img/home/t-series-2017-alt.jpg" />
                  <p className="legend">Legend 1</p>
              </div>
              <div>
                  <img src="https://www.native-instruments.com/typo3temp/pics/img-welcome-hero-studio-drummer-c1ac5742d634802b0cab948d9c4f3d23-d.jpg" />
                  <p className="legend">Legend 2</p>
              </div>
              <div>
                  <img src="https://usa.yamaha.com/files/GB1K_1000x400_1200x480_bf8ff5dbe8358af2fb8496c3d3f0768b.jpg" />
                  <p className="legend">Legend 3</p>
              </div>
          </Carousel>
      );
  }
}

