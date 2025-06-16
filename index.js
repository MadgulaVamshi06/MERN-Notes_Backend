/* === File: index.js === */
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const noteRoute = require("./routes/noteRoute");
const cors = require("cors");

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();



const allowedOrigins = [
  "http://localhost:5173", 
  "https://mern-notes-ro1m.vercel.app" 
];


const corsOptions = {
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // ✅ allow cookies or auth headers
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/notes", noteRoute);

// rest api
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Note" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});





