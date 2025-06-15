const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB Database: ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDB: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
