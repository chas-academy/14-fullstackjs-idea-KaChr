const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');


module.exports = function loginInputValidation(data) {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  // check if email is valid
  if(!Validator.isEmail(data.email)) {
    error.email = 'This field must contain a valid email address.';
  }
  // check if email is empty
  if(Validator.isEmpty(data.email)) {
    error.email = 'This field is required.';
  }



  // check if password is empty
  if(Validator.isEmpty(data.password)) {
    error.password = 'This field is required.';
  }


  return {
    error: error,
    isValid: isEmpty(error)
  }
}
