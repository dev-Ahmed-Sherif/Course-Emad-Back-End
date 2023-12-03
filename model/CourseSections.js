const mongoose = require("mongoose");

const courseSectionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    materialIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "materials",
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

courseSections = mongoose.model("courseSections", courseSectionsSchema);
module.exports = courseSections;
