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

  // check if email is valid
  if (!Validator.isEmail(data.email)) {
    error.email = 'This field must contain a valid email address.';
  }
  // check if email is empty
  if (Validator.isEmpty(data.email)) {
    error.email = 'This field is required.';
  }

  // check if password contain lower and uppercase letters
  if (
    Validator.isLowercase(data.password) ||
    Validator.isUppercase(data.password)
  ) {
    error.password = 'Password must contain upper and lowercase letters.';
  }
  // check if password has valid length
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    error.password =
      'This field must have a length between 8 and 30 characters.';
  }
  // check if password is empty
  if (Validator.isEmpty(data.password)) {
    error.password = 'This field is required.';
  }

  // check if password contain lower and uppercase letters
  if (
    Validator.isLowercase(data.password_new_1) ||
    Validator.isUppercase(data.password_new_1)
  ) {
    error.password_new_1 = 'Password must contain upper and lowercase letters.';
  }
  // check if password has valid length
  if (!Validator.isLength(data.password_new_1, { min: 8, max: 30 })) {
    error.password_new_1 =
      'This field must have a length between 8 and 30 characters.';
  }
  // check if password is empty
  if (Validator.isEmpty(data.password_new_1)) {
    error.password_new_1 = 'This field is required.';
  }

  //  // check if password contain lower and uppercase letters
  //  if (
  //   Validator.isLowercase(data.password_new_2) ||
  //   Validator.isUppercase(data.password_new_2)
  // ) {
  //   error.password_new_2 = 'Password must contain upper and lowercase letters.';
  // }
  // // check if password has valid length
  // if (!Validator.isLength(data.password_new_2, { min: 8, max: 30 })) {
  //   error.password_new_2 =
  //     'This field must have a length between 8 and 30 characters.';
  // }
  // check if password is empty
  if (Validator.isEmpty(data.password_new_2)) {
    error.password_new_2 = 'This field is required.';
  }

  if (!validator.equals(password_new_1, password_new_2)) {
    error.password_new_2 = 'The new passwords does not match';
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
