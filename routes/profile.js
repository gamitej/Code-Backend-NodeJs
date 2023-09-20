const {
  getUserStatus,
  getTableData,
} = require("../controllers/profile.controller");

const router = require("express").Router();

/**
 * @swagger
 * /api/v1/profile/user_status:
 *   get:
 *     summary: User profile status data
 *     tags: [Profile]
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
 *         description: User ID to retrieve user data
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile data
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/user_status", getUserStatus);

/**
 * @swagger
 * /api/v1/profile/table_data:
 *   get:
 *     summary: Get all topics data
 *     tags: [Profile]
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
 *         description: User ID to retrieve user table data
 *     responses:
 *       200:
 *         description: Successfully retrieved user table data
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/table_data", getTableData);

module.exports = router;
