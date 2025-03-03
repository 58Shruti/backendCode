const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profileImage: String,
  password: String,
  username: { type: String, unique: true, sparse: true }, // sparse allows multiple null values
  bio: { type: String, maxlength: 200 }, // Add bio
  education: String, // Add education
  jobTitle: String, // Add job title
});
module.exports = mongoose.model("User", userSchema);