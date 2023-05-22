// authMiddleware.js
const authMiddleware = (req, res, next) => {
  // Check if the user is logged in
  const loggedIn = req.session.loggedIn || false;

  // Set a local variable to be accessible in your Handlebars templates
  res.locals.loggedIn = loggedIn;

  // Call the next middleware or route handler
  next();
};

module.exports = authMiddleware;
