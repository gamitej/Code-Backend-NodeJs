const Questions = require("../models/Questions");
const Solved = require("../models/Solved");
const { sortBy } = require("lodash");
const { exploreData, selectedTopicData } = require("../data/dummyData");

// ==================== EXPLORE TOPIC ===================

const getExploreTopics = async (req, res) => {
  try {
    const re = req.query.id;

    return res.status(200).json({ data: exploreData, error: false });
  } catch (error) {
    return res.status(500).json({ data: "Something Went Wrong!", error: true });
  }
};

// ==================== SELECTED TOPIC ===================

const getSelectedTopics = async (req, res) => {
  try {
    // request
    const { id, topic } = req.query;

    if (!id || !topic)
      return res
        .status(404)
        .json({ data: "All fields are required", error: true });

    // get data from db
    const questions = await Questions.find({ topic });
    const solvedQuestions = await Solved.find({ userId: id, topic });

    // convert solvedQuestions to map
    const solvedQuestionIds = new Set(
      solvedQuestions.map((solved) => solved.quesId)
    );

    // data manipulation
    const levelMapping = {
      easy: { body: [], cardTitle: "Easy", cardType: "easy" },
      medium: { body: [], cardTitle: "Medium", cardType: "medium" },
      hard: { body: [], cardTitle: "Hard", cardType: "hard" },
    };

    const sortedQuestionsData = sortBy(questions, "questionName");

    sortedQuestionsData.map(({ _id, questionName, url, level }) => {
      levelMapping[level].body.push({
        id: _id,
        name: questionName,
        url,
        completed: solvedQuestionIds.has(_id.toString()),
      });
    });

    // final response body
    const response = [
      levelMapping.easy,
      levelMapping.medium,
      levelMapping.hard,
    ];

    // response
    return res.status(200).json({ data: response, error: false });
  } catch (error) {
    return res.status(500).json({ data: "Something Went Wrong!", error: true });
  }
};

// ==================== MARK QUESTION ====================

const markSelectedTopic = async (req, res) => {};

module.exports = { getSelectedTopics, markSelectedTopic, getExploreTopics };
