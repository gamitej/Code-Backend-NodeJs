const router = require("express").Router();
const exploreData = require("../data/dummyData");

router.get("/topics", async (req, res) => {
  try {
    const re = req.query.id;
    console.log(re);

    return res.json({ data: exploreData, error: false });
  } catch (error) {
    return res.json({ data: "hi", error: true });
  }
});

module.exports = router;
