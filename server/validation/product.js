const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function productInputValidation(data) {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  // check if name has valid length
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    error.name = 'This field must have a length between 2 and 30 characters.';
  }

  // check if name is empty
  if (Validator.isEmpty(data.name)) {
    error.name = 'This field is required.';
  }

  // check if category is empty
  if (Validator.isEmpty(data.category)) {
    error.category = 'This field is required.';
  }

  // check if description has valid length
  if (!Validator.isLength(data.description, { min: 2, max: 200 })) {
    error.description =
      'This field must have a length between 2 and 200 characters.';
  }
  // check if description is empty
  if (Validator.isEmpty(data.description)) {
    error.description = 'This field is required.';
  }

  // check if price only contains numbers
  if (!Validator.isNumeric(data.price)) {
    error.price = 'This field can only contain numbers.';
  }
  // check if price is empty
  if (Validator.isEmpty(data.price)) {
    error.price = 'This field is required.';
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
