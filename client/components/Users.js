import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getOrdersThunk, changeOrderThunk } from '../store/orders';
import UserCard from './UserCard';
// import { Button, Form, Table } from 'semantic-ui-react';

class Users extends Component {
  // CHANGE ALL BELOW

  render() {
    return (
      <div className="flex" style={{ flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div>
          <UserCard style={{margin: '10px'}}/>
        </div>
      </div>
    );
  }
}

const mapProps = state => ({
  // orders: state.orders
});

const mapDispatch = dispatch => {
  // return {
  //   fetchOrders() {
  //     return dispatch(getOrdersThunk());
  //   },
  //   changeOrder(order) {
  //     return dispatch(changeOrderThunk(order));
  //   }
  // };
};

// const Container = connect(mapProps, mapDispatch)(Users);
const Container = connect(null, null)(Users);

export default Container;
