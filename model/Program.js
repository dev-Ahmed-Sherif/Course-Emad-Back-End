const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
    coursesIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courses",
      },
    ],
    requestIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "requests",
      },
    ],
    NoSales: {
      type: Number,
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

program = mongoose.model("programs", programSchema);
module.exports = program;
