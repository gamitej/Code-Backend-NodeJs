const { userData, tableData } = require("../data/dummyData");

// ============== USER STATUS DATA ===============

const getUserStatus = async (req, res) => {
  try {
    return res.status(200).json({ data: userData, error: false });
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
