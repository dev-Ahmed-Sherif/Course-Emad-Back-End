const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    instructorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    sectionIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courseSections",
      },
    ],
    catIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "catagories",
      },
    ],
    courseState: {
      type: String,
      enum: ["active", "suspend"],
      default: "suspend",
    },
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

course = mongoose.model("courses", courseSchema);
module.exports = course;
