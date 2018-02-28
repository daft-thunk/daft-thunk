import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrder } from '../store';
import { Button, Form } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class ShippingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <Form onSubmit={handleSubmit} >
          <Form.Field label="email">
            <label htmlFor="email"><small>email</small></label>
            <input name="email" type="text" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="Address"><small>Address</small></label>
            <input name="Address" type="text" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="city"><small>City</small></label>
            <input name="city" type="text" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="State"><small>State</small></label>
            <input name="State" type="text" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="ZIP"><small>ZIP</small></label>
            <input name="ZIP" type="text" />
          </Form.Field>
          <Button type="submit">Contiune</Button>
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

  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, data) {
      console.log(data)
      evt.preventDefault();
      const email = evt.target.email.value;
      const address = evt.target.address.value;
      const city = evt.target.city.value;
      const state = evt.target.state.value;
      const zip = evt.target.zip.value;
      dispatch(addOrder({ email, mailingAddress: `${address} ${city}, ${state} ${zip}` }));
    }
  };
};

export default connect(mapState, mapDispatch)(ShippingForm);

/**
 * PROP TYPES
 */
ShippingForm.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired
};
