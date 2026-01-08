const mongoose = require("mongoose");

const contactS = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactS);

module.exports = Contact;
