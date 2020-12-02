const jwt = require("jsonwebtoken");

const currentUser = (req, res, next) => {
  if (!req.session) {
    return next();
  }

  try {
    req.currentUser = jwt.verify(req.session.jwt, "key");
  } catch (err) {}

  next();
};

module.exports = currentUser;
