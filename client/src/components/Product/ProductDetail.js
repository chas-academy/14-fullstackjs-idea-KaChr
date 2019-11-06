import React, { Component } from 'react';
// Import type-checking
import { PropTypes } from 'prop-types';
// Connecting redux to component
import { connect } from 'react-redux';
// import actions from userActions
import { getProduct } from '../../actions/productActions';
// Import link
import { Link } from 'react-router-dom';

export class ProductDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProduct(this.props.match.params.id);
    }
  }

  render() {
    const { product } = this.props;

    const img_url = product.img_url
      ? product.img_url
      : `./mayana-plant__triton.jpg`;

    const latin_name = product.latin_name ? product.latin_name : null;

    if (Object.keys(product).length === 0) {
      return <div>Loading</div>;
    } else {
      return (
        <div className={'product'}>
          <img src={img_url} />
          <article className={'product--info'}>
            <header>
              <h3>{product.name}</h3>
              <h5>{latin_name}</h5>
              <span>${product.price}</span>
              <Link to={`/category/${product.category.category_url_slug}`}>
                <span>{product.category.category_name}</span>
              </Link>
            </header>
            <p>{product.description}</p>
          </article>
        </div>
      );
    }
  }
}

// Type-checking
ProductDetail.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};

// Making props out of states to use in component
const mapStateToProps = state => ({
  product: state.products.product
});

// Connects the variable with the action (connecting redux to the component)
export default connect(
  mapStateToProps,
  { getProduct }
)(ProductDetail);
