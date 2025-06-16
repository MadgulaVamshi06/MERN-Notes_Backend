const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const noteRoute = require("./routes/noteRoute");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// === CORS CONFIG ===
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-notes-ro1m.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/notes", noteRoute);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Note" });
});

// Only for local server start (not in Vercel)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

module.exports = app;
