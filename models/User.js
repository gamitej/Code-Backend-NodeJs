const mongoose = require("mongoose");
const uuid = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid.v4(),
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
