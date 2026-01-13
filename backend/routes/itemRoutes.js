const express = require("express");
const app = express();
const itemModel = require("../models/itemModel");
const multer = require("multer");
const path = require("path");
// konfigurime multer
// Percaktion vendin se ku ruhen filet
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// Filtrim filesh
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });
// CRUD=> Create(post); Read(get); Update(put/patch); Delete(delete)
// post => Create / add => .save(); marr info nga input => req.body
app.post("/addItem/", upload.single("photo"), async (req, res) => {
  try {
    // Marr info nga react(input) dhe kalohen tek modeli
    const newItem = new itemModel({
      ...req.body,
      photo: req.file.filename,
    });
    // Informacionet e modelit => ruhen
    await newItem.save();
    console.log("Item created");
    res.status(200).send(newItem);
  } catch (err) {
    console.log("Not add " + err);
    res.status(500).send("Not add " + err);
  }
});
// Read all => get
app.get("/readAllItem/", async (req, res) => {
  try {
    //   .find({}) gjen te gjitha infomacionet
    // .find({emriFusheS: vlera})
    const allItem = await itemModel.find({});
    console.log(allItem);
    res.status(200).send(allItem);
  } catch (err) {
    console.log("Not read all item " + err);
    res.status(500).send("Not read all item " + err);
  }
});
// Read one => get
app.get("/readOneItem/:id/", async (req, res) => {
  try {
    const idItem = req.params.id;
    //   const oneItem = await itemModel.findOne({ _id: idItem });
    const oneItem = await itemModel.findById(idItem);
    console.log(oneItem);
    res.status(200).send(oneItem);
  } catch (err) {
    console.log("Not read one item " + err);
    res.status(500).send("Not read one item " + err);
  }
});

// Delete => .delete
app.delete("/deleteOneItem/:id/", async (req, res) => {
  try {
    const idItem = req.params.id;
    //  await itemModel.deleteOne({ _id: idItem });
    await itemModel.findByIdAndDelete(idItem);
    console.log("Deleted");
    res.status(200).send("Deleted");
  } catch (err) {
    console.log("Not deleted item " + err);
    res.status(500).send("Not deleted item " + err);
  }
});
// Update=> .patch()
app.patch("/updateOneItem/:id/", upload.single("photo"), async (req, res) => {
  try {
    const idItem = req.params.id;
    const infoItem = { ...req.body };
    if (req.file) {
      infoItem.photo = req.file.filename;
    }
    const updateItem = await itemModel.findByIdAndUpdate(
      idItem,
      { $set: infoItem },
      { new: true }
    );
    console.log("Item update :" + updateItem);
    res.status(200).send(updateItem);
  } catch (err) {
    console.log("Not updated item " + err);
    res.status(500).send("Not updated item " + err);
  }
});
module.exports = app;
