import React, { Component } from 'react';
// Connecting redux to component
import { connect } from 'react-redux';
// Import type-checking
import { PropTypes } from 'prop-types';
// import actions from productActions
import { getProducts } from '../../actions/productActions';
// Import Product component
import { Product } from '../../components';

export class Home extends Component {
  UNSAFE_componentWillMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props;

    if (!products) {
      return null;
    }

    if (!products.length) {
      return <span>Loading…</span>;
    } else {
      return (
        <div>
          <ul>
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </ul>
        </div>
      );
    }
  }
}

// Type-checking
Home.propTypes = {
  products: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
});

// Making props out of states to use in component
const mapStateToProps = state => ({
  products: state.products.products
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
