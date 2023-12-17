const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  const bodyToken = req.body.token;
  // console.log(req);
  // console.log(req.cookies);
  // console.log(bodyToken);
  if (token) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("Auth error", err.message);
        res.send({ message: err.message });
      } else {
        // console.log(decodedToken);
        // const loginUser = await User.findById(decodedToken.id);
        next();
      }
    });
  } else if (bodyToken) {
    jwt.verify(
      bodyToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.send({ message: err.message });
        } else {
          // console.log(decodedToken);
          // const loginUser = await User.findById(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("not allowed");
    res.status(400).send({ message: "غير مصرح لك بدخول السيستم" });
  }
};

module.exports = requireAuth;
