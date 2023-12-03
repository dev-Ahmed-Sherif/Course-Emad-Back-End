require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const con = require("./config/conn");

const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));

app.listen(process.env.PORT || 7000, () => {
  console.log("server on", process.env.PORT);
});
