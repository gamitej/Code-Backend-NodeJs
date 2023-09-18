const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const dotenv = require("dotenv");

dotenv.config();
const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = async (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication", error: true });
  }
  try {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = await User.findById(decoded.user_id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", error: true });
  }
  return next();
};

module.exports = verifyToken;
