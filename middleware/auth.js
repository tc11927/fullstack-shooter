// Require user to be authenticated
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Require user to NOT be authenticated (for login/signup pages)
function requireGuest(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect('/game');
  }
  next();
}

module.exports = {
  requireAuth,
  requireGuest
};
