import React from 'react';
// Import type-checking
import { PropTypes } from 'prop-types';
// Import link
import { Link } from 'react-router-dom';

function Product({ product }) {
  const img_url = product.img_url
    ? product.img_url
    : `/mayana-plant__triton.jpg`;

  const latin_name = product.latin_name ? product.latin_name : null;

  return (
    <li className={'product--list'}>
      <Link to={`/product/${product._id}`}>
        <img src={img_url} alt='Plant' />
      </Link>
      <article className={'product--info'}>
        <header>
          <h2>{product.name}</h2>
          <h6>{latin_name}</h6>
          <span>Price: ${product.price}</span>
          <br />
          Category:
          <br />
          <Link to={`/category/${product.category.category_url_slug}`}>
            <span>{product.category.category_name}</span>
          </Link>
        </header>
      </article>
    </li>
  );
}

// Type-checking
Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default Product;
