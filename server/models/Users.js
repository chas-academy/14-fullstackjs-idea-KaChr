const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

/**
 *  This will remove the password property
 *  from the user response object when and only
 *  when the response format is JSON
 */

UserSchema.set('toJSON', {
  transform: function(doc, user, opt) {
    delete user['password'];

    return user;
  }
});

module.exports = mongoose.model('Users', UserSchema);
