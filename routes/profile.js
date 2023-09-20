const {
  getUserStatus,
  getTableData,
} = require("../controllers/profile.controller");

const router = require("express").Router();

router.get("/user_status", getUserStatus);

router.get("/table_data", getTableData);

module.exports = router;
