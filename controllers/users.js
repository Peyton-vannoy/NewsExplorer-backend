const User = require("../models/user");

const createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.create({ email, password, username });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
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
    next(err);
  }
};

module.exports = { createUser, getCurrentUser };
