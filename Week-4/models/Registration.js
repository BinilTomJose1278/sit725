const mongoose = require("mongoose");

// Define the schema for the registration data
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  studentId: { type: String, required: true },
  about: { type: String, required: true },
});

// Create a model using the schema
const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
