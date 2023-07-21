const validateSession = (req, res, next) => {
    if (req.session.userLogin) {
      return  next()
    }
   return res.redirect("/user/login")

  };
  module.exports = validateSession;
  