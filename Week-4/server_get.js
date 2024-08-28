require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

// Import the controller function
const { registerUser } = require("./controllers/registrationController");

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

// Use the controller function to handle the POST request
app.post("/api/register", registerUser);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
