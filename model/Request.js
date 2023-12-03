const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      enum: ["accepted", "suspend", "deleted"],
      default: "suspend",
    },
    dateAdded: {
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
request = mongoose.model("requests", requestSchema);
module.exports = request;
