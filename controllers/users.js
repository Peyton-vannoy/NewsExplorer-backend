const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Dont send password in response
    const userResponse = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (err) {
    if (err.code === "ValidationError") {
      return res.status(400).json({ message: "Invalid input" });
    }
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User fetched successfully", user });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser, getCurrentUser, signIn };
