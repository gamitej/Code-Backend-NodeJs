const Solved = require("../models/Solved");
const Questions = require("../models/Questions");
const { tableData } = require("../data/dummyData");

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
      hardSolved: levelMapping.medium.solved,
      hardTotal: levelMapping.medium.total,
      mediumSolved: levelMapping.hard.solved,
      mediumTotal: levelMapping.hard.total,
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
    return res.status(200).json({ data: tableData, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Something Went Wrong!", error: true });
  }
};

module.exports = { getUserStatus, getTableData };
