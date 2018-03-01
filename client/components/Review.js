import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addOrder } from '../store';
import { Button, Form } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(this.state)
    this.setState({[e.target.name]: e.target.value });
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <div>
        <Form onSubmit={() => handleSubmit(event, this.state)}>
          <Form.Field>
            <label>title</label>
            <input placeholder="title" name="title" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>review</label>
            <input placeholder="review" name="review" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>rating</label>
            <input placeholder="rating" name="rating" onChange={this.handleChange} />
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

  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, localState) {
      const { title, review, rating } = localState;
    //  dispatch(addOrder({ email, mailingAddress: `${address} ${city}, ${state} ${zip}` }));
    }
  };
};

export default connect(mapState, mapDispatch)(Review);

/**
 * PROP TYPES
 */
// ShippingForm.propTypes = {
//   address: PropTypes.string.isRequired,
//   city: PropTypes.string.isRequired,
//   state: PropTypes.string.isRequired,
//   zip: PropTypes.string.isRequired
// };
