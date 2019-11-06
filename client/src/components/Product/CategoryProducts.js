import React, { Component } from 'react';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// import actions from userActions
import { getProductsByCategory } from '../../actions/productActions';
// Import Product component
import { Product } from '../../components';

export class CategoryProducts extends Component {
  componentDidMount() {
    if (this.props.match.params.category_url_slug) {
      this.props.getProductsByCategory(
        this.props.match.params.category_url_slug
      );
    }
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
CategoryProducts.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category_url_slug: PropTypes.node
    }).isRequired
  }).isRequired
};

// Making props out of states to use in component
const mapStateToProps = state => ({
  products: state.products.products
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { getProductsByCategory }
)(CategoryProducts);
