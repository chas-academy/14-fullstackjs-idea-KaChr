const express = require('express');
const router = express.Router();

// User model schema
const User = require('../models/Users');
// Form validation
const editUserInputValidation = require('../validation/edit');

// Middleware to check JWT token
let tokenCheck = require('../middleware/tokenCheck');
let requireAdmin = require('../middleware/requreAdmin');

// read all users: /users
router.get('/', tokenCheck, requireAdmin, (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      return res
        .status(500)
        .send(
          'There was an error while retreving the users from the database.'
        );
    } else {
      return res.status(200).send(users);
    }
  });
});

// read one user: /users/:id
router.get('/:id', tokenCheck, (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) {
      return res
        .status(500)
        .send('There was an error while retreving the user from the database.');
    } else {
      return res.status(200).send(user);
    }
  });
});

// update user: /users/:id
router.put('/:id', tokenCheck, (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = editUserInputValidation(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: error });
  }
  const update = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true },
    (error, user) => {
      if (error) {
        error.update =
          'There was an error while updating the user in the database.';
        return res.status(500).json(error);
      } else {
        return res.status(200).json('success');
      }
    }
  );
});

// update user role: /users/role/:id
router.patch('/role/:id', tokenCheck, requireAdmin, (req, res) => {
  const update = { admin: req.body.admin };

  User.findOneAndUpdate(
    { _id: req.params.id },
    update,
    { new: true },
    (error, user) => {
      if (error) {
        error.update =
          'There was an error while updating the users role in the database.';
        return res.status(500).json(error);
      } else {
        return res.status(200).json(user.admin);
      }
    }
  );
});

// delete user: /users/:id
router.delete('/:id', tokenCheck, requireAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, user) => {
    if (error) {
      return res
        .status(500)
        .send('There was an error while deleting the user from the database.');
    } else {
      return res.status(200).send('The user was successfully deleted.');
    }
  });
});

module.exports = router;
