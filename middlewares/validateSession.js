const validateSession = (req, res, next) => {
    if (req.session.userLogin) {
      res.locals.userLogin = req.session.userLogin
    }
    next()
  };
  module.exports = validateSession;
  