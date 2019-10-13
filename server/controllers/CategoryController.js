const express = require('express');
const router = express.Router();

// Category model schema
const Category = require('../models/Categories');
// Form validation
const categoryInputValidation = require('../validation/category');

// create new category: /categories
router.post('/', (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = categoryInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  // Check if category exists, create if there is none
  Category.findOne({ category_name: req.body.category_name })
    .then(category => {
      if (category) {
        error.category_name = 'This category does already excist.';
        return res.status(400).json(error);
      } else {
        const newCategory = req.body;

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

module.exports = router;
