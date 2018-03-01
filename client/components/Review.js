import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addOrder } from '../store';
import { Button, Form, Rating } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating });

  render() {
    const { rating } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div>
        <Form onSubmit={() => handleSubmit(event, this.state)}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Rating:</label>
              <Rating
                icon="star"
                defaultRating={3}
                maxRating={5}
                onRate={this.handleRate}
              />
            </Form.Field>
          </Form.Group>
          <Form.TextArea
            onChange={this.handleChange}
            label="Review"
            name="review"
            placeholder="Tell us your thoughts..."
            width={10}
          />
          <br />
          <Button type="submit">Submit</Button>
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

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
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
