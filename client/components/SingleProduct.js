import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../history';
import store, { setProductThunk, addProductToCart } from '../store';
import { Icon, Button } from 'semantic-ui-react';
import { Review } from './index';

class SingleProduct extends Component {
  componentWillMount() {
    store.dispatch(setProductThunk(this.props.match.params.id));
  }

  render() {
    return (
      <div id="singleProductContainer">
        <h1>{this.props.product.name}</h1>
        <hr width="75%" />
        <div className="singleProductflex">
          <div>
            <img src={this.props.product.imageUrl} />
          </div>
          <div className="productInfo">
            <h1>
              <Icon name="dollar" />
              {this.props.product.price}
            </h1>
            <h3>{this.props.product.description}</h3>
            <h3>Manufacturer: {this.props.product.manufacturer}</h3>
            <Button className="productButton" fluid animated="vertical">
              <Button.Content
                onClick={() =>
                  this.props.handleAddToCart(
                    this.props.cartId,
                    this.props.product.id
                  )
                }
                hidden
              >
                Add to Cart
              </Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
            {this.props.userRole === 'admin' && (
              <Link to={`/admin/products/${this.props.product.id}/edit`} >
              <Button className="productButton" primary fluid animated="vertical">
                <Button.Content hidden>
                  Edit Product
                </Button.Content>
                <Button.Content visible>
                  <Icon name="wrench" />
                </Button.Content>
              </Button>
              </Link>
            )}
          </div>
        </div>
        <hr width="75%" />
        <h1>Reviews</h1>
        {/* check if user has ordered product. */}
        {/* send userId to <Review> */}
        {this.props.product.id && (
          <Review
            productId={this.props.product.id}
            userId={this.props.userId}
          />
        )}
        {this.props.product.reviews &&
          this.props.product.reviews.map(review => {
            let stars = String.fromCharCode(9733).repeat(review.rating);
            return (
              <div key={review.id}>
                {review.user ? (
                  <h2>{review.user.fullName}</h2>
                ) : (
                  <h2>anonymous</h2>
                )}
                <h2>{stars}</h2>
                <h3>{review.text}</h3>
                <hr width="50%" />
              </div>
            );
          })}
      </div>
    );
  }
}

const mapProps = state => ({
  product: state.activeProduct,
  cartId: state.cart.id,
  userId: state.user.id,
  userRole: state.user.role
});

const mapDispatch = (dispatch, ownProps) => ({
  handleAddToCart(cartId, productId) {
    console.log(cartId);
    dispatch(addProductToCart(cartId, { productId }));
  }
});

const Container = connect(mapProps, mapDispatch)(SingleProduct);

export default Container;
