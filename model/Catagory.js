const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
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

catagory = mongoose.model("catagories", catagorySchema);
module.exports = catagory;
