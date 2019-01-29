const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

module.exports = router;
