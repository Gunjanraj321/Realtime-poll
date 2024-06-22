require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
    console.log(req.body);
  const { email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTSECRETKEY
    );
    console.log(token)
    return res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "registration issue, something went wrong on server",
    });
  }
};

const userLogin = async (req, res) => {
    console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTSECRETKEY
    );
    console.log(token)
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "something went wrong while login",
    });
  }
};

module.exports = { userLogin, userSignup };
