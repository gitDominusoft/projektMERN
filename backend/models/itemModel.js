const mongoose = require("mongoose");

const itemS = new mongoose.Schema({
  itemName: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
});

const Item = mongoose.model("Item", itemS);

module.exports = Item;
