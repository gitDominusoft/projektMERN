const express = require("express");
const app = express();
const contactModel = require("../models/contactModel");

// CRUD=> Create(post); Read(get); Update(put/patch); Delete(delete)
// post => Create / add => .save(); marr info nga input => req.body
app.post("/addContact/", async (req, res) => {
  try {
    // Marr info nga react(input) dhe kalohen tek modeli
    console.log(req.body);
    const newContact = new contactModel(req.body);
    // Informacionet e modelit => ruhen
    await newContact.save();
    console.log("Contact created");
    res.status(200).send(newContact);
  } catch (err) {
    console.log("Not add " + err);
    res.status(500).send("Not add " + err);
  }
});

module.exports = app;
