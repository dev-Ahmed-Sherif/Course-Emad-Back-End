const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("body roles", req.body);
    if (!req?.roles)
      return res.status(401).send({ message: "غير مصرح لك بدخول السيستم" });
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result)
      return res.status(401).send({ message: "غير مصرح لك بدخول السيستم" });
    next();
  };
};

module.exports = verifyRoles;
