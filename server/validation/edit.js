const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function editUserInputValidation(data) {
  let error = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
  data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.adress = !isEmpty(data.adress) ? data.adress : '';
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  // check if firstname has valid length
  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    error.first_name =
      'This field must have a length between 2 and 30 characters.';
  }
  // check if firstname is empty
  if (Validator.isEmpty(data.first_name)) {
    error.first_name = 'This field is required.';
  }

  // check if lastname has valid length
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    error.last_name =
      'This field must have a length between 2 and 30 characters.';
  }
  // check if lastname is empty
  if (Validator.isEmpty(data.last_name)) {
    error.last_name = 'This field is required.';
  }

  // check if email is valid
  if (!Validator.isEmail(data.email)) {
    error.email = 'This field must contain a valid email address.';
  }
  // check if email is empty
  if (Validator.isEmpty(data.email)) {
    error.email = 'This field is required.';
  }

  // check if adress has valid length
  if (!Validator.isLength(data.adress, { min: 2, max: 30 })) {
    error.adress = 'This field must have a length between 2 and 30 characters.';
  }
  // check if adress is empty
  if (Validator.isEmpty(data.adress)) {
    error.adress = 'This field is required.';
  }

  // check if zipcode only contains numbers
  if (!Validator.isNumeric(data.zipcode)) {
    error.zipcode = 'This field can only contain numbers.';
  }
  // check if zipcode is empty
  if (Validator.isEmpty(data.zipcode)) {
    error.zipcode = 'This field is required.';
  }

  // check if phone number has valid length
  if (!Validator.isLength(data.phone, { min: 2, max: 30 })) {
    error.phone = 'This field must have a length between 2 and 30 characters';
  }
  // check if phone is empty
  if (Validator.isEmpty(data.phone)) {
    error.phone = 'This field is required';
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
