const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function categoryInputValidation(data) {
  let error = {};

  data.category_name = !isEmpty(data.category_name) ? data.category_name : '';

  // check if category has valid length
  if (!Validator.isLength(data.category_name, { min: 2, max: 30 })) {
    error.category_name =
      'This field must have a length between 2 and 30 characters';
  }

  // check if category is empty
  if (Validator.isEmpty(data.category_name)) {
    error.category_name = 'This field is required.';
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
