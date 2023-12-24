const Cat = require("../model/Catagory");
const path = require("path");

let optionsCatFile = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const handleAdd = async (req, res) => {
  const files = req.files;
  const { name } = req.body;
  //   console.log(files);
  console.log(req.body);

  let Ext;

  //   console.log(`${new Date().getHours()}:${new Date().getMinutes()}`);

  Object.keys(files).forEach((key) => {
    // const fileNameNoExt = files[key].name.substring(
    //   0,
    //   files[key].name.lastIndexOf(".")
    // );
    const fileExt = files[key].name.substring(files[key].name.lastIndexOf("."));
    Ext = fileExt;

    const filepath = path.join(
      __dirname,
      "../public/Catagory",
      `${new Date().toLocaleDateString(
        "ar-EG",
        optionsCatFile
      )}_cat_${new Date().getHours()}h${new Date().getMinutes()}m${Ext}`
    );
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });

  const catNew = await Cat.create({
    name: name,
    image: `public/Catagory/${new Date().toLocaleDateString(
      "ar-EG",
      optionsCatFile
    )}_cat_${new Date().getHours()}h${new Date().getMinutes()}m${Ext}`,
    dateAdded: new Date().toLocaleDateString("ar-EG", options),
  });

  return res.json({
    message: "success",
  });
};

module.exports = { handleAdd };
