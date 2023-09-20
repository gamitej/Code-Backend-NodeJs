const Questions = require("../models/Questions");
const Solved = require("../models/Solved");
const { sortBy } = require("lodash");
const nameMapping = require("../utils/nameMapping.json");

// ==================== EXPLORE TOPIC ===================

const getExploreTopics = async (req, res) => {
  try {
    // request
    const { id } = req.query;

    if (!id)
      return res.status(404).json({ data: "Id is required", error: true });

    // data from db
    const questions = await Questions.find();
    const solvedQuestions = await Solved.find({ userId: id });

    // convert solvedQuestions to map
    const solvedQuestionIds = new Set(
      solvedQuestions.map((solved) => solved.quesId)
    );

    // data manipulation
    const topicMapping = new Map();

    questions.forEach(({ topic, _id }) => {
      if (topicMapping.has(topic)) {
        const topicInfo = topicMapping.get(topic);
        topicInfo.total += 1;

        if (solvedQuestionIds.has(_id.toString())) {
          topicInfo.solved += 1;
        }
      } else {
        const newTopicInfo = {
          solved: 0,
          total: 1,
          title: nameMapping[topic],
          urlTitle: topic,
        };

        if (solvedQuestionIds.has(_id.toString())) {
          newTopicInfo.solved += 1;
        }

        topicMapping.set(topic, newTopicInfo);
      }
    });

    // final explore data
    const exploreTopicData = Array.from(topicMapping.values());

    const sortedExploreData = sortBy(exploreTopicData, "title");

    // response data
    const response = {
      data: sortedExploreData,
      onGoingTopic: {
        data: "arrays",
        onGoingTopic: true,
      },
    };

    return res.status(200).json({ data: response, error: false });
  } catch (error) {
    console.log(error);
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

const markSelectedTopic = async (req, res) => {
  try {
    // request
    const { user_id, question_id, topic } = req.body;

    if (!user_id && !question_id && !topic)
      return res
        .status(404)
        .json({ data: "All fields are required", error: true });

    const solved = await Solved.findOne({
      userId: user_id,
      quesId: question_id,
      topic,
    });

    if (solved) {
      // unmark question
      await solved.deleteOne();
      return res
        .status(200)
        .json({ data: "Question unmarked successfully", error: true });
    } else {
      // save request to db
      await Solved.create({
        userId: user_id,
        quesId: question_id,
        topic,
      });

      return res.status(200).json({ data: "Marked", error: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Something went wrong", error: true });
  }
};

module.exports = { getSelectedTopics, markSelectedTopic, getExploreTopics };
