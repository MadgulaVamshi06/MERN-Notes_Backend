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
  "https://mern-notes-frontend.vercel.app" 
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/notes", noteRoute);

// default route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Note" });
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

module.exports = app;
