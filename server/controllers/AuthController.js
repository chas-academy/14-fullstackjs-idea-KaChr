const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/Users');

// Create new user: /auth/register
router.post('/register', (req, res) => {
  // Hash the password
  var bcryptPassword = bcrypt.hashSync(req.body.password, 8);
  
  // Check if user exists, create if there is none
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'This email is already taken.' });
      } else {
        User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcryptPassword,
          adress: req.body.adress,
          zipcode: req.body.zipcode,
          phone: req.body.phone,
          admin: req.body.admin,
        },
        (err, user) => {
          if (err) return res.status(500).send('There was a problem while adding this user.')
          // Create a token
          var jwtToken = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours before it expires
          });
          res.status(200).send({ authenticate: true, token: jwtToken });
        });
      }
  });
});

// Login user: /auth/login
router.post('/login', (req, res) => {
  // Find user
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) return res.status(404).send('Could not find user');

      // Make sure the passwords are the same
      bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // Create a payload for JWT
            const jwtPayload = { id: user._id, admin: user.admin };

            // Return Success and a token
            return res.json({
              succes: true,
              token: 'Bearer ' + jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: 86400 }) // 24 hours before it expires
            });
          } else {
            return res.status(401).json('Invalid password.');
          }
        });
    });
});

// Show current user: /auth/me
router.get('/me',
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
