const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: mongoose.Types.ObjectId,
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
