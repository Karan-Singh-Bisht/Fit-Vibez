const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlackListToken = require("../models/blackListToken.model");

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userService.registerUser({
      firstName: userName.firstName,
      lastName: userName.lastName,
      email,
      password,
    });
    if (!user) {
      return res.status(400).json({ message: "Failed to register user" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    const { password: excluded, ...newUser } = user._doc;
    return res.status(201).json({ token, newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password]" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    const { password: excluded, ...userDetails } = user._doc;
    return res.json({ token, userDetails });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

module.exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await BlackListToken.create({ token });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
