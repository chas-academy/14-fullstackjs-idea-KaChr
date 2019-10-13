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

// read all categories: /categories
router.get('/', (req, res) => {
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

// read all categorie: /categories

// read one category: /categories/:id

// // delete category: /categories/:id

// const editUserInputValidation = require('../validation/edit');

// // read all users: /users
// router.get('/', (req, res) => {
//   User.find({}, (error, users) => {
//     if (error) {
//       return res
//         .status(500)
//         .send(
//           'There was an error while retreving the users from the database.'
//         );
//     } else {
//       return res.status(200).send(users);
//     }
//   });
// });

// // read one user: /users/:id
// router.get('/:id', (req, res) => {
//   User.findById(req.params.id, (error, user) => {
//     if (error) {
//       return res
//         .status(500)
//         .send('There was an error while retreving the user from the database.');
//     } else {
//       return res.status(200).send(user);
//     }
//   });
// });

// // update user: /users/:id
// router.put('/:id', (req, res) => {
//   // checks that all values from req.body that goes thrugh this router are valid
//   const { error, isValid } = editUserInputValidation(req.body);
//   if (!isValid) {
//     return res.status(400).json({ errors: error });
//   }
//   const update = req.body;

//   User.findByIdAndUpdate(
//     req.params.id,
//     update,
//     { new: true },
//     (error, user) => {
//       if (error) {
//         error.update =
//           'There was an error while updating the user in the database.';
//         return res.status(500).json(error);
//       } else {
//         return res.status(200).json('success');
//       }
//     }
//   );
// });

// // delete user: /users/:id
// router.delete('/:id', (req, res) => {
//   User.findByIdAndDelete(req.params.id, (error, user) => {
//     if (error) {
//       return res
//         .status(500)
//         .send('There was an error while deleting the user from the database.');
//     } else {
//       return res.status(200).send('The user was successfully deleted.');
//     }
//   });
// });

module.exports = router;
