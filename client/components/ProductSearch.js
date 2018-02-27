import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search, Grid, Header } from 'semantic-ui-react';

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

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.name);
      console.log('state!!!', this.state.value)
      this.setState({
        isLoading: false,
        results: _.filter(this.props.products, isMatch)
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state;
    // const {products} = this.props
    // console.log('>>>products',products, this.props)
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            title={name}
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

const Container = connect(mapProps)(ProductSearch);

export default Container;
