const express = require('express');
const router = express.Router();

// Category model schema
const Category = require('../models/Categories');
// Form validation
const categoryInputValidation = require('../validation/category');

// Middleware to check JWT token
let tokenCheck = require('../middleware/tokenCheck');
let requireAdmin = require('../middleware/requreAdmin');

// create new category: /categories
router.post('/', tokenCheck, requireAdmin, (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = categoryInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  // Check if category exists, create if there is none
  Category.findOne({ category_name: req.body.category_name })
    .then(category => {
      if (category) {
        error.category_name = 'This category already exists.';
        return res.status(400).json(error);
      } else {
        const newCategory = {
          category_name: req.body.category_name
        };

        Category.create(newCategory, (err, category) => {
          if (err) {
            return res.status(500).json({
              message: 'There was a problem while adding this category.'
            });
          }
          res.status(200).json({ message: 'The category has been added' });
        });
      }
    })
    .catch(error => {
      return res.status(404).json({
        message: 'There was a problem while trying to add category'
      });
    });
});

// read all categories: /categories
router.get('/', tokenCheck, (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      return res
        .status(500)
        .send(
          'There was an error while retreving the categories from the database.'
        );
    } else {
      return res.status(200).send(categories);
    }
  });
});

// read one category: /categories/:id
router.get('/:id', tokenCheck, (req, res) => {
  Category.findById(req.params.id, (err, category) => {
    if (err) {
      return res
        .status(500)
        .send(
          'There was an error while retreving the category from the database.'
        );
    } else {
      return res.status(200).send(category);
    }
  });
});

// delete category: /categories/:id
router.delete('/:id', tokenCheck, requireAdmin, (req, res) => {
  Category.findByIdAndDelete(req.params.id, (err, category) => {
    if (err) {
      return res
        .status(500)
        .send(
          'There was an error while deleting the category from the database.'
        );
    } else {
      return res.status(200).send('The category was successfully deleted.');
    }
  });
});

module.exports = router;
