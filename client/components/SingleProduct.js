import React, { Component } from 'react';
import {connect} from 'react-redux';
import { history } from '../history';
import store, { setProductThunk } from '../store';
import { Icon, Button } from 'semantic-ui-react'

class SingleProduct extends Component{

  componentWillMount(){
    store.dispatch(setProductThunk(this.props.match.params.id));
  }

  render(){
    return (
      <div id="singleProductContainer">
        <h1>{this.props.product.name}</h1>
        <hr width="75%" />
        <div className="singleProductflex">
          <div><img src={this.props.product.imageUrl} /></div>
          <div className="productInfo">
          <h1><Icon name="dollar" />{this.props.product.price}</h1>
          <h3>{this.props.product.description}</h3>
          <h3>Manufacturer: {this.props.product.manufacturer}</h3>
          <Button className="productButton" fluid animated="vertical">
            <Button.Content hidden>Add to Cart</Button.Content>
              <Button.Content visible>
              <Icon name="shop" />
            </Button.Content>
           </Button>
          </div>
        </div>
        <hr width="75%" />
        <h1>Reviews</h1>
        {
          this.props.product.reviews && this.props.product.reviews.map(review => {
            let stars = String.fromCharCode(9733).repeat(review.rating);
            return (
              <div key={review.id}>
                <h2>{review.user.fullName}</h2>
                <h2>{stars}</h2>
                <h3>{review.text}</h3>
                <hr width="50%" />
              </div>
              );
            }
          )
        }
      </div>
    );
  }
}

const mapProps = state => ({
  product: state.activeProduct
});

const Container = connect(mapProps)(SingleProduct);

export default Container;

