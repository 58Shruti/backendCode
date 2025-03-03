require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the DB connection function

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

// Export the app for Vercel
module.exports = app;
