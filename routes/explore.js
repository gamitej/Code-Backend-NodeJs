const router = require("express").Router();
const {
  getExploreTopics,
  getSelectedTopics,
  markSelectedTopic,
} = require("../controllers/explore.controller");

/**
 * @swagger
 * /api/v1/topics:
 *   get:
 *     summary: Get all topics data of a particular user
 *     tags: [Topics]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token (Bearer token)
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID for which topics are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved topics for the user
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *       404:
 *         description: User not found or no topics available for the user
 *       500:
 *         description: Internal server error
 */

router.get("/topics", getExploreTopics);

/**
 * @swagger
 * /api/v1/selected_topic:
 *   get:
 *     summary: Get a selected topic data of a particular user
 *     tags: [Topics]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token (Bearer token)
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID for which topics are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved selected topics ques for the user
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *       404:
 *         description: User not found or no questions available for the user
 *       500:
 *         description: Internal server error
 */

router.get("/selected_topic", getSelectedTopics);

/**
 * @swagger
 * /api/v1/markQuestion:
 *   post:
 *     summary: Mark / Unmark selected topic question
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               question_id:
 *                 type: string
 *               topic:
 *                 type: string
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token (Bearer token)
 *     responses:
 *       200:
 *         description: Successfully marked or unmarked topic question
 *       401:
 *         description: Unauthorized (JWT token missing or invalid)
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

router.post("/markQuestion", markSelectedTopic);

module.exports = router;
