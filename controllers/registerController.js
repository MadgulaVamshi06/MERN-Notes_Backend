const userModel = require("../models/userModel");
const { hashPassword } = require("../helpers/authHelper.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, answer, address } = req.body;
    if (!name || !email || !password || !phone || !answer || !address) {
      return res.send({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(200).send({ success: false, message: "Already Registered" });

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({ name, email, phone, password: hashedPassword, address, answer }).save();
    res.status(201).send({ success: true, message: "User Registered", user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Registration Error", error });
  }
};

module.exports = registerController;