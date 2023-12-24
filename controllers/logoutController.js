const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookie = req.cookies?.jwt;
  console.log(
    `cookie available at logout: ${JSON.stringify(
      cookie
    )} at ${new Date().getHours()}:${new Date().getMinutes()}`
  );
  if (!cookie) return res.sendStatus(204); //No content
  const refreshToken = cookie;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(`logout User :`, result.name, result.email);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
