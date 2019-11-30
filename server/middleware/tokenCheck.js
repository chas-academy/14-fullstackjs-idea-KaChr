let jwt = require('jsonwebtoken');

tokenCheck = (req, res, next) => {
  let jwtToken = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  // Check if token exist and verify it
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.SECRET, (err, jwtDecoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'The token is not valid'
        });
      } else {
        req.userId = jwtDecoded.id;
        req.adminUser = jwtDecoded.admin;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Token is not supplied'
    });
  }
};

module.exports = tokenCheck;
