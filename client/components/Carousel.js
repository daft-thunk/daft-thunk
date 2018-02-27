import React from 'react';
import { connect } from 'react-redux';
import { CarouselProvider, Slider, Slide, Image, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Carousel extends React.Component {
  render() {
    return (
      <CarouselProvider
        currentSlide={this.props.currentSlide}
        naturalSlideWidth={100}
        naturalSlideHeight={25}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}><Image src="http://www.collingsguitars.com/img/home/t-series-2017-alt.jpg" /></Slide>
          <Slide index={1}><Image src="https://www.native-instruments.com/typo3temp/pics/img-welcome-hero-studio-drummer-c1ac5742d634802b0cab948d9c4f3d23-d.jpg" /></Slide>
          <Slide index={2}><Image src="https://usa.yamaha.com/files/GB1K_1000x400_1200x480_bf8ff5dbe8358af2fb8496c3d3f0768b.jpg" /></Slide>
        </Slider>
        <DotGroup className="center" />
      </CarouselProvider>
    );
  }
}

const mapProps = state => ({
  currentSlide: state.currentSlide
});

const Container = connect(mapProps)(Carousel);

export default Container;
