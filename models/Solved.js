const mongoose = require("mongoose");

const SolvedSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    quesId: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Solved = mongoose.model("Solved", SolvedSchema);

module.exports = Solved;
