const mongoose = require("mongoose");

// initialize schema
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3
    }
  },
  {
    timestamps: true
  }
);

// wrap in model
const User = mongoose.model("User", userSchema);

module.exports = User;
