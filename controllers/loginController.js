const userModel = require("../models/userModel");
const { comparePassword } = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "Email not registered" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(200).send({ success: false, message: "Invalid Password" });

    const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "2d" });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone },
      token,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Login Error", error });
  }
};

module.exports = loginController;