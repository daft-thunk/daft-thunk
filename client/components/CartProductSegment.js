import React, { Component } from 'react';
import { Segment, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CartProductSegment extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 0,
      plusClass: 'ui button',
      minusClass: 'ui button'
    };
  }

  componentDidMount() {
    const quantity = this.props.product.cart_to_product.quantity;
    const plusClass = quantity >= this.props.product.stock ? 'ui disabled button' : 'ui button';
    const minusClass = quantity === 1 ? 'ui disabled button' : 'ui button';

    this.setState({
      quantity,
      plusClass,
      minusClass
    });
  }

  render() {
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
              className={this.state.plusClass} onClick={(event) => {
                this.props.addOne(event, this.state.quantity, this.props.product.id);
                const quantity = this.state.quantity + 1;
                const plusClass = quantity + 1 >= this.props.product.stock ? 'ui disabled button' : 'ui button';
                const minusClass = quantity === 1 ? 'ui disabled button' : 'ui button';
                this.setState({ quantity, plusClass, minusClass });
              }} >
              <i className="plus icon" />
            </button>
            <button
              className={this.state.minusClass} onClick={(event) => {
                this.props.removeOne(event, this.state.quantity, this.props.product.id);
                const quantity = this.state.quantity - 1;
                const minusClass = quantity === 1 ? 'ui disabled button' : 'ui button';
                const plusClass = quantity + 1 >= this.props.product.stock ? 'ui disabled button' : 'ui button';
                this.setState({ quantity, minusClass, plusClass });
              }} >
              <i className="minus icon" />
            </button>
            <button
              className="ui button" onClick={(event) => {
                this.props.removeProduct(event, this.props.product.id);
                console.log('product was removed');
              }}>
              <i className="trash alternate outline icon" />
            </button>
          </div>
        </div>

      </Segment>
    );
  }
}


export default CartProductSegment;
