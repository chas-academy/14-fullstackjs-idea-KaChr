const express = require('express');
const router = express.Router();

// Product model schema
const Product = require('../models/Products');
// Category model schema
const Category = require('../models/Categories');

// Form validation
const productInputValidation = require('../validation/product');
const editProductInputValidation = require('../validation/edit-product');

// Middleware to check JWT token
let tokenCheck = require('../middleware/tokenCheck');
let requireAdmin = require('../middleware/requreAdmin');

// read all products: /products
router.get('/', tokenCheck, (req, res) => {
  Product.find({})
    .populate('category')
    .exec((err, products) => {
      if (err) {
        return res
          .status(500)
          .send(
            'There was an error while retreving the products from the database.'
          );
      } else {
        return res.status(200).send(products);
      }
    });
});

// read one product: /products/:id
router.get('/:id', tokenCheck, (req, res) => {
  Product.findById(req.params.id)
    .populate('category')
    .exec((err, product) => {
      if (err) {
        return res
          .status(500)
          .send(
            'There was an error while retreving the product from the database.'
          );
      } else {
        return res.status(200).json(product);
      }
    });
});

// get products by category: /products/category/:category_url_slug (e.g. /products/category/perennials)
router.get('/category/:category_url_slug', tokenCheck, (req, res) => {
  Product.find()
    .populate('category')
    .exec((error, products) => {
      if (error) {
        return res.status(500).json({
          message: 'Unsuccessful execution',
          error: `${error}`
        });
      }
      products = products.filter(
        product =>
          product.category.category_url_slug === req.params.category_url_slug
      );
      if (products.length > 0) {
        return res.status(200).json(products);
      } else {
        return res.status(404).json({
          message:
            'There was a problem while trying find product by that category',
          error: `${error}`
        });
      }
    });
});

// create new product: /products
router.post('/', tokenCheck, requireAdmin, (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = productInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  // Check if product exists, create if there is none
  Product.findOne({ name: req.body.name })
    .then(product => {
      if (product) {
        error.name = 'This product already exists.';
        return res.status(400).json(error);
      } else {
        const newProduct = req.body;
        Category.find({ _id: req.body.category }).then(category => {
          if (!category) {
            error.category = 'This category does not exist';
            return res.status(400).json(error);
          } else {
            Product.create(newProduct, (error, product) => {
              if (error) {
                return res.status(500).json({
                  message: 'There was a problem while adding this product.',
                  error: `${error}`
                });
              }
              res.status(200).json({ message: 'The product has been added' });
            });
          }
        });
      }
    })
    .catch(error => {
      return res.status(404).json({
        message: 'There was a problem while trying to add the product',
        error: `${error}`
      });
    });
});

// update product: /products/:id
router.put('/:id', tokenCheck, requireAdmin, (req, res) => {
  // checks that all values from req.body that goes through this router are valid
  const { error, isValid } = editProductInputValidation(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: error });
  }

  const update = req.body;

  Product.findOneAndUpdate(req.params.id, update, (error, user) => {
    if (error) {
      error.update =
        'There was an error while updating the product in the database.';
      return res.status(500).json(error);
    } else {
      return res.status(200).json('success');
    }
  });
});

// delete product: /products/:id
router.delete('/:id', tokenCheck, requireAdmin, (req, res) => {
  Product.findByIdAndDelete(req.params.id, (error, product) => {
    if (error) {
      return res.status(500).json({
        message:
          'There was an error while deleting the product from the database.',
        error: `${error}`
      });
    } else {
      return res.status(200).json({
        message: 'The product was successfully deleted.'
      });
    }
  });
});

module.exports = router;
