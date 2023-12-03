const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    materialSource: {
      type: String,
    },
    watchedUserIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
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

material = mongoose.model("materials", materialSchema);
module.exports = material;
