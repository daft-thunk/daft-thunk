import React, { Component } from 'react';
import { Segment, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CartProductSegment extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 0
    };
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.product.cart_to_product.quantity});
  }

  render() {
    // TODO set up onclick for add to cart
    console.log('quantity ', this.state.quantity)
    return (
      <Segment vertical className="cart flex">
        <Image src={this.props.product.imageUrl} />
        <Link to={`/products/${this.props.product.id}`} >
          {this.props.product.name}
        </Link>
        <div className="cart-price">
          <Icon name="dollar" />
          {this.props.product.price}
        </div>
        <div className="flex cart-quantity">
          <div>
            Quantity <span>{this.state.quantity}</span>
          </div>
          <div className="ui buttons">
            <button
className="ui button" onClick={(event) => {
              this.props.addOne(event, this.state.quantity, this.props.product.id);
              this.setState({quantity: this.state.quantity + 1});
            }} >
              <i className="plus icon" />
            </button>
            <button className="ui button">
              <i className="minus icon" />
            </button>
            <button className="ui button">
              <i className="trash alternate outline icon" />
            </button>
          </div>
        </div>

      </Segment>
    );
  }
}


export default CartProductSegment;
