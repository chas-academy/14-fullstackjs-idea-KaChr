const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function updatePasswordInputValidation(data) {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_new_1 = !isEmpty(data.password_new_1)
    ? data.password_new_1
    : '';
  data.password_new_2 = !isEmpty(data.password_new_2)
    ? data.password_new_2
    : '';

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
