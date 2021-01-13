const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).redirect("/ReqLogin");
  }
  next();
};

module.exports = requireLogin;
