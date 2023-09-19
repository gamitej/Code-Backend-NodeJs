const mongoose = require("mongoose");
const uuid = require("uuid");

const QuestionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid.v4(),
    },
    url: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    questionName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", QuestionSchema);

module.exports = Questions;
