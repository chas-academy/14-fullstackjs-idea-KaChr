const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const registerInputValidation = require('../validation/register');
const loginInputValidation = require('../validation/login');
const User = require('../models/Users');

// Create new user: /auth/register
router.post('/register', (req, res) => {
  // checks that all values from req.body that goes thrugh this router are valid
  const { error, isValid } = registerInputValidation(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }
  // Hash the password
  var bcryptPassword = bcrypt.hashSync(req.body.password, 8);

  // Check if user exists, create if there is none
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      error.email = 'This email is already taken.';
      return res.status(400).json(error);
    } else {
      const newUser = req.body;

      User.create(
        {
          newUser
        },
        (err, user) => {
          if (err) {
            return res
              .status(500)
              .send('There was a problem while adding this user.');
          }
          // Create a token
          const jwtToken = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours before it expires
          });

          res.status(200).send({ authenticate: true, token: jwtToken });
        }
      );
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
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // Create a payload for JWT
        const jwtPayload = { id: user._id, admin: user.admin };

        // Return Success and a token
        return res.json({
          succes: true,
          token:
            'Bearer ' +
            jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: 86400 }) // 24 hours before it expires
        });
      } else {
        error.password = 'Invalid password.';
        return res.status(401).json(error);
      }
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
