import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrder } from '../store';
import { Button, Form, Message, Dropdown } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      addressError: false,
      cityError: false,
      stateError: false,
      zipError: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, address, city, state, zip } = this.state;
    if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      this.setState({ emailError: true });
    } if (!address || address.length < 3) {
      this.setState({ addressError: true });
    } if (!city || city.length < 1) {
      this.setState({ cityError: true });
    } if (!state || state.length < 2) {
      this.setState({ stateError: true });
    } if (!zip || zip.length < 5) {
      this.setState({ zipError: true });
    } else {
      this.props.submitOrder({ email, mailingAddress: `${address} ${city}, ${state} ${zip}`, purchasedCart: this.props.cart, userId: this.props.user.id, cartId: this.props.cart.id });
    }
  }

  render() {

    const { emailError, addressError, cityError, stateError, zipError } = this.state;

    return (
      <div>
        <Form onSubmit={() => this.handleSubmit(event)}>
          <Form.Field className="form-field" error={emailError}>
            <label>email</label>
            <input placeholder="email" name="email" onChange={this.handleChange} />
          </Form.Field>
          {emailError && (
            <Message
              error
              header="Please enter valid email."
              style={{ display: 'block', maxWidth: 275 }}
            />
          )}
          <Form.Field className="form-field" error={addressError}>
            <label>Address</label>
            <input placeholder="Address" name="address" onChange={this.handleChange} />
          </Form.Field>
          {addressError && (
            <Message
              error
              header="Address is required."
              style={{ display: 'block', maxWidth: 275 }}
            />
          )}
          <Form.Field className="form-field" error={cityError}>
            <label>City</label>
            <input placeholder="City" name="city" onChange={this.handleChange} />
          </Form.Field>
          {cityError && (
            <Message
              error
              header="City is required."
              style={{ display: 'block', maxWidth: 275 }}
            />
          )}
          <Form.Field className="form-field" error={stateError}>
            <label>State</label>
            <input maxLength="2" placeholder="State" name="state" onChange={this.handleChange} />
          </Form.Field>
          {stateError && (
            <Message
              error
              header="Please enter valid State."
              style={{ display: 'block', maxWidth: 275 }}
            />
          )}
          <Form.Field className="form-field" error={zipError}>
            <label>ZIP</label>
            <input maxLength="5" placeholder="ZIP" name="zip" onChange={this.handleChange} />
          </Form.Field>
          {zipError && (
            <Message
              error
              header="Please enter valid zip."
              style={{ display: 'block', maxWidth: 275 }}
            />
          )}
          <div className="form-button">
            <Button color="green" type="submit">Place Order</Button>
          </div>
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
    cart: state.cart,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    submitOrder(order) {
      dispatch(addOrder(order));
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

