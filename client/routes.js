import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, UserHome, Products, SingleProduct, Cart, Home, Orders, Review, Checkout, Confirmation, Users, ProductAdd } from './components';
import store, {me, initCart, getUserCart } from './store';
import axios from 'axios';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount(){
    this.props.loadInitialData();
    //if no user is logged in create a cart
    if (!this.props.cart.user){
      this.props.loadCart();
    }
  }
  //link the created cart to the logged in user or overide it with the users saved cart if the created cart is empty.
  componentDidUpdate(){
    if (this.props.user.id && !this.props.cart.userId && this.props.cart.id){
      this.props.linkCart(this.props.user.id, this.props.cart);
    }
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmation" component={Confirmation} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/profile" component={UserHome} />
              <Route path="/review" component={Review} />
              {
                isAdmin &&
                <Switch>
                <Route path="/admin/orders/" component={Orders} />
                <Route path="/admin/users/" component={Users} />
                <Route path="/admin/product-add" component={ProductAdd} />
                <Route path="/admin/products/:id/edit" component={ProductAdd} />
                </Switch>
              }
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    user: state.user,
    isAdmin: state.user.role === 'admin'
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
    },
    loadCart (){
      dispatch(initCart());
    },
    linkCart(userId, currentCart){
      dispatch(getUserCart(userId, currentCart));
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
