const mongoose = require("mongoose");

// initialize schema
const Schema = mongoose.Schema;

// create schema
const exerciseSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    // name: {
    //   type: String,
    //   required: true,
    //   trim: true
    // },
    description: {
      type: String,
      required: false,
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      trim: true
    },
    // location: {
    //   type: String,
    //   required: false,
    //   trim: true
    // },
    // equipment: {
    //   type: String,
    //   required: false,
    //   trim: true
    // },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// wrap in model
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
