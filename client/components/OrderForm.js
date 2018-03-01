import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrder } from '../store';
import { Button, Form } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <Form onSubmit={() => handleSubmit(event, this.state, this.props.cart)}>
          <Form.Field>
            <label>email</label>
            <input placeholder="email" name="email" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input placeholder="Address" name="address" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input placeholder="City" name="city" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>State</label>
            <input placeholder="State" name="state" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>ZIP</label>
            <input placeholder="ZIP" name="zip" onChange={this.handleChange} />
          </Form.Field>
          <Button type="submit">Continue</Button>
        </Form>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapState = (state) => {
  return {
      cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, localState, cart) {
      const { email, address, city, state, zip } = localState;
     dispatch(addOrder({ email, mailingAddress: `${address} ${city}, ${state} ${zip}`, purchasedcart: cart }));
    }
  };
};

export default connect(mapState, mapDispatch)(OrderForm);

/**
 * PROP TYPES
 */
// ShippingForm.propTypes = {
//   address: PropTypes.string.isRequired,
//   city: PropTypes.string.isRequired,
//   state: PropTypes.string.isRequired,
//   zip: PropTypes.string.isRequired
// };
