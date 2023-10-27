const mongoose = require("mongoose");
const moment = require("moment");

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
    dateTime: {
      type: String,
      default: () => moment().format("DD:MM:YYYY HH:mm:ss"),
    },
  },
  { timestamps: true }
);

const Solved = mongoose.model("Solved", SolvedSchema);

module.exports = Solved;
