const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
let app = express();
// import Routes
const contactRoute = require("./routes/contactRoutes");
// Konfigurimet
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  })
);
app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(express.json({ limit: "1000mb", extended: true }));
// Lidhja me mongoDB
mongoose
  .connect(
    "mongodb+srv://admin:123@cluster0.iwgtttr.mongodb.net/DBMERN?appName=Cluster0"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Something is wrong", err));
// Therritja e Route
  app.use(contactRoute);
// test server
app.use("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
// Krijimi i serverit
app.listen(5000, (req, res) => {
  console.log("Server Created!");
});
