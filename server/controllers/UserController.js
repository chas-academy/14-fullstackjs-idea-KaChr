const express = require('express');
const router = express.Router();

const User = require('../models/Users');

// read all users: /users
router.get('/', (req, res) => {
  User.find({}, (error, users) => {
      if (error) {
          return res.status(500).send("There was an error while retreving the users from the database.");
      } else {
          return res.status(200).send(users);
      }
  })
});

// read one user: /users/:id
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            return res.status(500).send('There was an error while retreving the user from the database.');
        } else {
            return res.status(200).send(user);
        }
    })
});

// update user: /users/:id
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, user) => {
        if (error) {
            return res.status(500).send('There was an error while updating the user in the database.');
        } else {
            return res.status(200).send(user);
        }
    })
});

// delete user: /users/:id
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, user) => {
        if (error) {
            return res.status(500).send('There was an error while deleting the user from the database.')
        } else {
            return res.status(200).send('The user was successfully deleted.');
        }
    })
});


module.exports = router;
