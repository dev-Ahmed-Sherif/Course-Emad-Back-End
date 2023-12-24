const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  const files = await req.files;
  console.log("files", files);
  const { name } = await req.body;
  console.log("name", name);
  const token = req.cookies.jwt;
  console.log("cookie", token);
  const bodyToken = req.body.token;
  console.log("body authMiddleware", req.body);
  // console.log(req.cookies);
  console.log("bodyToken", bodyToken);
  if (token) {
    console.log("cookie after If", token);
    await jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err) {
          console.log("Auth error", err.message);
          res.status(401).send({ message: "غير مصرح لك بدخول السيستم" });
        } else {
          // console.log(decodedToken);
          // const loginUser = await User.findById(decodedToken.id);
          next();
        }
      }
    );
  } else if (bodyToken) {
    console.log("bodyToken after if", bodyToken);
    jwt.verify(
      bodyToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedToken) => {
        if (err) {
          console.log("Auth error", err.message);
          res.status(401).send({ message: "غير مصرح لك بدخول السيستم" });
        } else {
          // console.log(decodedToken);
          // const loginUser = await User.findById(decodedToken.id);
          next();
        }
      }
    );
  } else {
    console.log("not allowed");
    res.status(401).send({ message: "غير مصرح لك بدخول السيستم" });
  }
};

module.exports = requireAuth;
