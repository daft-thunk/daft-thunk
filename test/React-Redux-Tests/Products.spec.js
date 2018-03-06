import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductCard } from '../../client/components/ProductCard';
import { Products } from '../../client/components/Products';
import { ProductSelector } from '../../client/components/ProductSelector';
import sinon, { spy } from 'sinon';

const adapter = new Adapter();
enzyme.configure({ adapter });

// describe('UserHome', () => {
//   let userHome;

//   beforeEach(() => {
//     userHome = shallow(<UserHome email={'cody@email.com'} />);
//   });

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
//   });
// });

describe('Product Page Components', () => {

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
    let mockHandleClick;
    let mockHandleAddToCart;
    let mockCartToProduct = { cartId: -1, productId: -1 };
    beforeEach(() => {
      const product = {
        name: 'Fender Telecaster',
        price: 500.51,
        description: 'Blah Blah Telecaster Blah',
        manufacturer: 'Fender',
        stock: 10,
        imageUrl: '/images/fender-telecaster.png',
        id: 1
      };

      mockHandleClick = sinon.spy();
      mockHandleAddToCart = sinon.spy((cartId, productId) => {
        mockCartToProduct = { cartId, productId };
      });
      productCard = shallow(<ProductCard product={product} handleClick={mockHandleClick} handleAddToCart={mockHandleAddToCart} cartId={4} />);
    });
    it('displays product name', () => {
      let name = productCard.find('.product-name').dive();
      expect(name.text()).to.eql('Fender Telecaster');
    });

    it('displays correct product price', () => {
      let price = productCard.find('.price-number');
      expect(price.text()).to.eql('500.51');
    });

    it('displays correct product image', () => {
      let img = productCard.find('.product-image').dive();
      expect(img.prop('src')).to.eql('/images/fender-telecaster.png');
    });

    it('clicking button links to product page', () => {
      productCard.find('.view-product-button').dive().simulate('click');
      expect(mockHandleClick.calledOnce).to.eql(true);
    });

    it('clicking button adds correct product to cart', () => {
      productCard.find('.add-to-cart-button').dive().simulate('click');
      expect(mockHandleAddToCart.calledOnce).to.eql(true);
      expect(mockCartToProduct.productId).to.eql(1);
      expect(mockCartToProduct.cartId).to.eql(4);
    });
  });

  describe('Product Selector', () => {
    let productSelector;
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
    })
  })
});
