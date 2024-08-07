require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const Registration = require("./models/Registration");

const app = express();
const port = 3040;

// Use the MongoDB URI from the environment variables
const mongoUri = process.env.MONGODB_URI;
console.log("Connecting to MongoDB at:", mongoUri);

// Connect to MongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: mongoUri,
    }),
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/register", async (req, res) => {
  const { name, country, studentId, about } = req.body;

  try {
    const registration = new Registration({
      name,
      country,
      studentId,
      about,
    });

    await registration.save();
    console.log(
      `Received registration: Name=${name}, Country=${country},  Student ID=${studentId}, About=${about}`
    );
    res.json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Registration failed!" });
  }
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
