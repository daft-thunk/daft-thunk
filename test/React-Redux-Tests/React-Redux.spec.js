import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Products} from '../../client/components/Products';

// const adapter = new Adapter();
// enzyme.configure({adapter});

// describe('UserHome', () => {
//   let userHome;

//   beforeEach(() => {
//     userHome = shallow(<UserHome email={'cody@email.com'} />);
//   });

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
//   });
// });

describe('Products', () => {
  let Products;
  beforeEach(() => {
    const testProducts = [{
      name: 'Fender Telecaster',
      price: 500.50,
      description: 'Blah Blah Telecaster Blah',
      manufacturer: 'Fender',
      stock: 10,
      imageUrl: '/images/fender-telecaster.png'
    },
    {
      name: 'Gibson Les Paul',
      price: 28.28,
      description: 'Blah Blah Les Paul Blah',
      manufacturer: 'Gibson',
      stock: 20,
      imageUrl: '/images/les-paul-tribute.png'
    },
    {
      name: 'Martin X',
      price: 675.95,
      description: 'Blah Blah Martin X Blah',
      manufacturer: 'Martin',
      stock: 20,
      imageUrl: '/images/martin-x.png'
    }];
    Products = shallow(<Products products={testProducts} />);
  });

  it('displays all products with no filtering');
})
;
