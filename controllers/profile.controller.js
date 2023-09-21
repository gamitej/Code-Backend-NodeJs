const Solved = require("../models/Solved");
const Questions = require("../models/Questions");
const { sortBy } = require("lodash");
const nameMapping = require("../utils/nameMapping.json");

// ============== USER STATUS DATA ===============

const getUserStatus = async (req, res) => {
  try {
    // request
    const { id } = req.query;

    if (!id)
      return res.status(400).json({ data: "id is required", error: true });

    // data from db
    const questions = await Questions.find();
    const solvedQuestions = await Solved.find({ userId: id });

    // convert solvedQuestions to set of questions id
    const solvedQuestionIds = new Set(
      solvedQuestions.map((solved) => solved.quesId)
    );

    const levelMapping = {
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 },
    };

    let total = 0;
    let totalSolved = 0;

    questions.forEach(({ level, _id }) => {
      total += 1;
      levelMapping[level].total += 1;
      if (solvedQuestionIds.has(_id.toString())) {
        levelMapping[level].solved += 1;
        totalSolved += 1;
      }
    });

    // response body
    const response = {
      easySolved: levelMapping.easy.solved,
      easyTotal: levelMapping.easy.total,
      mediumSolved: levelMapping.medium.solved,
      mediumTotal: levelMapping.medium.total,
      hardSolved: levelMapping.hard.solved,
      hardTotal: levelMapping.hard.total,
      total,
      totalSolved,
    };

    return res.status(200).json({ data: response, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Something Went Wrong!", error: true });
  }
};

// =============== TABLE DATA ===================

const getTableData = async (req, res) => {
  try {
    // request
    const { id } = req.query;

    if (!id)
      return res.status(400).json({ data: "id is required", error: true });

    // data from db
    const questions = await Questions.find();
    const solvedQuestions = await Solved.find({ userId: id });

    // convert solvedQuestions to set of questions id
    const solvedQuestionIds = new Set(
      solvedQuestions.map((solved) => solved.quesId)
    );

    // data manipulation
    const response = questions.map(
      ({ url, topic, level, questionName, createdAt, _id }) => ({
        date: createdAt,
        done: solvedQuestionIds.has(_id.toString()) ? "Yes" : "No",
        url,
        topic: nameMapping[topic],
        level,
        question: questionName,
      })
    );

    const sortedResponse = sortBy(response, "date");

    return res.status(200).json({ data: { rows: response }, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Something Went Wrong!", error: true });
  }
};

module.exports = { getUserStatus, getTableData };
