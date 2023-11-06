const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  gender: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("users", UserSchema);
