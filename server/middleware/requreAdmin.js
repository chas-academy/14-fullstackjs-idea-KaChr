requireAdmin = (req, res, next) => {
  // Protect the admin routes from non admin users
  if (req.adminUser != true) {
    res.json({ message: 'Permission denied.' });
  } else {
    next();
  }
};

module.exports = requireAdmin;
