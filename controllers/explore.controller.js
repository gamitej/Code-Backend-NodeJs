const exploreData = require("../data/dummyData");

const getExploreTopics = async (req, res) => {
  try {
    const re = req.query.id;
    console.log(re);

    return res.json({ data: exploreData, error: false });
  } catch (error) {
    return res.json({ data: "hi", error: true });
  }
};

const getSelectedTopics = async (req, res) => {};

const markSelectedTopic = async (req, res) => {};

module.exports = { getSelectedTopics, markSelectedTopic, getExploreTopics };
