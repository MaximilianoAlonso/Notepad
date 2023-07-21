const validateSession = (req, res, next) => {
    if (req.session.userLogin) {
   return res.redirect("/user")
    }
   return  next()
  };
  module.exports = validateSession;
  