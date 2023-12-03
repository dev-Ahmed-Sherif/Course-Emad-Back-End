const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: String,
    image: {
      type: String,
    },
    roles: {
      User: {
        type: Number,
        default: 7,
      },
      Instractor: Number,
      Admin: Number,
      SuperAdmin: Number,
    },
    courseIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courses",
      },
    ],
    programIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "programs",
      },
    ],
    accountState: {
      type: String,
      enum: ["active", "suspend"],
      default: "active",
    },
    refreshToken: [String],
    dateRegister: {
      type: String,
    },
    dateUpdated: {
      type: String,
    },
  },
  {
    versionKey: false,
    strict: false,
  }
);

User = mongoose.model("User", userSchema);
module.exports = User;
