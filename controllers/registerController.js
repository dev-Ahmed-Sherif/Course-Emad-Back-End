const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const handleNewUser = async (req, res) => {
  const { name, email, pwd, tel } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(200).send({ message: "هذا الإيميل مسجل لدينا" }); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      name: name,
      email: email,
      password: hashedPwd,
      phoneNumber: tel,
      roles: { User: 7 },
      dateRegister: new Date().toLocaleDateString("ar-EG", options),
    });

    // console.log(result);

    const foundUser = await User.findOne({ email: email }).exec();

    // console.log(foundUser);

    // Get User Roles
    const roles = Object.values(foundUser.roles).filter(Boolean);

    // console.log(roles);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const RefreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // console.log(newRefreshToken);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(
      `New user ${name} created! at ${new Date().toLocaleDateString(
        "ar-EG",
        options
      )}`
    );

    // Send authorization roles and access token to user
    res.status(200).json({ foundUser, roles, accessToken, RefreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
