const express = require("express");
const router = express.Router();
const catagoryController = require("../controllers/catagoryController");

const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");

const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");

router.post(
  "/add",
  verifyRoles(ROLES_LIST.Admin),
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter(5),
  catagoryController.handleAdd
);

// router.get("/", async (req, res) => {
//   try {
//     // console.log("logedGetYear");
//     const year = await academicYear.find({});
//     // console.log(year);
//     res.status(200).send("hello year");
//   } catch (error) {}
// });

// router.delete("/delete", requireAuth, async (req, res) => {
//   // console.log(req.body);
//   try {
//     const year = await academicYear.deleteOne({ _id: req.body._id });
//     if (year) {
//       // console.log(year);
//       const years = await academicYear.find({});
//       res.status(200).send({ message: "تم الحذف بنجاح", data: years });
//     } else {
//       res.send({ message: "لم يتم الحذف" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
