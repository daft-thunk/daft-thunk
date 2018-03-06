import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Products} from '../client/components/Products';
import {ProductCard} from '../client/components/ProductCard';

const adapter = new Adapter();
enzyme.configure({adapter});

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
  let products;
  beforeEach(() => {
    const testProducts = [{
      name: 'Fender Telecaster',
      price: 500.50,
      description: 'Blah Blah Telecaster Blah',
      manufacturer: 'Fender',
      stock: 10,
      imageUrl: '/images/fender-telecaster.png',
      id: 1
    },
    {
      name: 'Gibson Les Paul',
      price: 28.28,
      description: 'Blah Blah Les Paul Blah',
      manufacturer: 'Gibson',
      stock: 20,
      imageUrl: '/images/les-paul-tribute.png',
      id: 2
    },
    {
      name: 'Martin X',
      price: 675.95,
      description: 'Blah Blah Martin X Blah',
      manufacturer: 'Martin',
      stock: 20,
      imageUrl: '/images/martin-x.png',
      id: 3
    }];
    products = shallow(<Products products={testProducts} />);
  });

  it('displays all products with no filtering', () => {
    expect(products.find('.product-card')).to.have.length(3);
  });


})
;

describe('Product Card', () => {
  let productCard;
  beforeEach(() => {
    const product = {
      name: 'Fender Telecaster',
      price: 500.50,
      description: 'Blah Blah Telecaster Blah',
      manufacturer: 'Fender',
      stock: 10,
      imageUrl: '/images/fender-telecaster.png',
      id: 1
    };
    productCard = shallow(<ProductCard product={product} />)
  })
  it('displays product name', () => {
    let name = productCard.find('.product-name');
    expect(name.text()).to.eql('Fender Telecaster')
  });

  it('displays correct product price');

  it('displays correct product image');

  it('has button ');
});
