const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;

// Form validation
const updatePasswordInputValidation = require('../validation/password');
const registerInputValidation = require('../validation/register');
const loginInputValidation = require('../validation/login');
// User model schema
const User = require('../models/Users');

// Middleware to check JWT token
let tokenCheck = require('../middleware/tokenCheck');

// Create new user: /auth/register
router.post('/register', (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = registerInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  // Check if user exists, create if there is none
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      error.email = 'This email is already taken.';
      return res.status(400).json(error);
    } else {
      // Hash the password
      const bcryptPassword = bcrypt.hashSync(req.body.password, 8);

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        encryptedPassword: bcryptPassword,
        adress: req.body.adress,
        zipcode: req.body.zipcode,
        phone: req.body.phone
      };

      User.create(newUser, (err, user) => {
        if (err) {
          return res.status(500).json({
            message: 'There was a problem while adding this user.'
          });
        }
        // Create a token
        const jwtToken = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400 // 24 hours before it expires
        });

        res.status(200).send({ authenticate: true, token: jwtToken });
      });
    }
  });
});

// Login user: /auth/login
router.post('/login', (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = loginInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  // Find user
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      error.email = 'Could not find user.';
      return res.status(404).json(error);
    }

    // Make sure the passwords are the same
    bcrypt.compare(req.body.password, user.encryptedPassword).then(isMatch => {
      if (isMatch) {
        // Create a payload for JWT
        const jwtPayload = { id: user._id };

        // Return Success and a token
        return res.json({
          success: true,
          token: jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: 86400 }) // 24 hours before it expires
        });
      } else {
        error.password = 'Invalid password.';
        return res.status(401).json(error);
      }
    });
  });
});

router.post('/update-password', tokenCheck, (req, res) => {
  // Checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = updatePasswordInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  // Check if user exists, if so update password
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        error.email = 'A user with that email could not be found.';
        return res.status(400).send(error);
      } else {
        // Check if the db password matches the enterd one
        bcrypt
          .compare(req.body.password, user.encryptedPassword)
          .then(isMatch => {
            if (isMatch) {
              // Hash the password
              const bcryptNewPassword = bcrypt.hashSync(
                req.body.password_new_1,
                8
              );

              // Save new password
              User.updateOne(
                { _id: ObjectId(user._id) },
                { $set: { encryptedPassword: bcryptNewPassword } }
              )
                .then(user => {
                  return res
                    .status(200)
                    .json({ message: 'The password has been updated' });
                })
                .catch(error => {
                  error.password =
                    'Something went wrong when trying to update the user password';
                  return res.status(400).json(error);
                });
            } else {
              error.password = 'The current password is incorrect';
              return res.status(400).json(error);
            }
          });
      }
    })
    .catch(error => {
      return res.status(404).json({
        message: 'There was a problem while trying to update the password'
      });
    });
});

// Show current user: /auth/me
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      admin: req.user.admin
    });
  }
);

module.exports = router;
