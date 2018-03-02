import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { submitReviewThunk } from '../store';
import { Button, Form, Rating, Message } from 'semantic-ui-react';

/**
 * COMPONENT
 */
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      productId: this.props.productId,
      userId: this.props.userId,
      error: false,
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.review) {
        this.setState({ error: false });
        this.setState({ success: false });
      }
    });
  }

  handleRate(e, { rating, maxRating }) {
    this.setState({ rating, maxRating });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.review) {
      this.setState({ error: true });
    } else {
      const { userId, productId, review, rating } = this.state;
      console.log('state:', userId, productId, review, rating);
      this.props.submitReview({ userId, productId, review, rating });
      this.setState({ success: true });
    }
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <Form onSubmit={() => this.handleSubmit(event)}>
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
            error={this.state.error}
            onChange={this.handleChange}
            label="Review"
            name="review"
            placeholder="Tell us your thoughts..."
            width={10}
          />
          {this.state.error && (
            <Message
              error
              header="This field is required."
              style={{ display: 'block', maxWidth: 220 }}
            />
          )}
          {this.state.success && (
            <Message
              success
              header="Your review was submitted."
              style={{ display: 'block', maxWidth: 270 }}
            />
          )}
          <br />
          <Button type="submit" disabled={this.state.success}>Submit</Button>
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
    submitReview(review) {
      dispatch(submitReviewThunk(review));
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
