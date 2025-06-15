const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };

/* === File: middleware/authToken.js === */
const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.TOKEN_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized", error });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (user.role !== 1) return res.status(401).send({ success: false, message: "Unauthorized Admin Access" });
  next();
};

module.exports = { requireSignIn, isAdmin };