const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    credits: {
      type: Number,
      default: 0,
    },
    displayName: {
      type: String,
    },
    familyName: {
      type: String,
    },
    givenName: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
