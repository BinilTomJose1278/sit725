const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  enrolledCourse: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
