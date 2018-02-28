import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon, { Search, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import history from '../history'

// change source to this.props.products
// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }));

class ProductSearch extends Component {
  // constructor(props) {
  //   super(props);
  //   this.source = this.props.products;
  // }
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => history.push(`/products/${result.key}`)

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.name);
      this.setState({
        isLoading: false,
        results: _.filter(this.props.products, isMatch)
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state;
    results.map(result => {
      result.key = result.id;
      result.title = result.name;
      result.image = result.imageUrl;
      result.description = String.fromCharCode(9733).repeat(result.reviews.length ? result.reviews[0].rating : 0);
    })
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapProps = state => ({
  products: state.products
});

const mapDispatch = null;
// {id: results.id, title: results.name, description: results.description, image: results.imageUrl, price: results.price}
const Container = connect(mapProps)(ProductSearch);

export default Container;
