const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userLogin = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "All input is required", error: true });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && password === user.password) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "4h",
        }
      );

      // user
      return res.status(200).json({
        message: "Login successfull",
        data: { id: user._id, name: username, token },
        error: false,
      });
    }
    return res
      .status(400)
      .json({ message: "Invalid Credentials", error: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: true });
  }
  // Our register logic ends here
};

// =================== REGISTER ===================

const registerUser = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(password && username)) {
      res.status(400).json({ message: "All input is required", error: true });
    }

    // check if user already exist & Validate if user exist in our database
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res
        .status(409)
        .json({ message: "User Already Exist.", error: true });
    }

    // Create user in our database
    const user = await User.create({
      username: username,
      password: password,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "60h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json({
      message: "Registeration successfull",
      data: { id: user._id, name: username, token },
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: true });
  }
};

module.exports = { userLogin, registerUser };
