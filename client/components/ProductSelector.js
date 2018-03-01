import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { filterProducts, getProductsThunk } from '../store';
import { connect } from 'react-redux';

const instruments = [
  {text: 'Guitars', value: 2, image: {avatar: true, src: 'https://www.martinguitar.com/media/8543/d-21_f_1195x3000.jpg'}},
  {text: 'Drums', value: 1, image: {avatar: true, src: 'https://media.sweetwater.com/api/i/q-85__ha-ce2db444639bd1df__hmac-82d5db78c0f90ca5fe3703aaffac501fe9f5285d/images/items/1800/DRKT45A-xlarge.jpg'}},
  {text: 'Keyboards', value: 'keyboards', image: {avatar: true, src: 'http://cdn.korg.com/us/products/upload/07f508b5f9824e683525f2d6cbc087f8_pc.png'}},
  {text: 'Bass Guitars', value: 3, image: {avatar: true, src: 'http://media.guitarcenter.com/is/image/MMGS7/Standard-Precision-Bass-Guitar-Brown-Sunburst-Rosewood-Fretboard/H76524000002001-00-500x500.jpg'}},
  {text: 'Amps', value: 'amps', image: {avatar: true, src: 'https://media.sweetwater.com/images/items/750/DSL40C-large.jpg?v=130c2b3cd44c4ab0'}},
  {text: 'All Products', value: 'showAll', image: {avatar: true, src: 'https://www.micromediaweb.com/home/1577576/wordpress/wp-content/uploads/2017/10/444678_10662441_1991136_145bf677_image.jpg'}}
];


const ProductSelector = (props) => (
  <Dropdown onChange={(event, data) => props.handleChange(data.value)} placeholder="Select Category" fluid selection options={instruments} />
);

const mapProps = () => ({});

const mapDispatch = dispatch => ({
  handleChange(id){
    dispatch(filterProducts(id));
  }
});

const Container = connect(mapProps, mapDispatch)(ProductSelector);

export default Container;
