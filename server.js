require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const userRoutes = require("./routes/userRoutes");
// const profileRoutes = require("./routes/profileRoutes");
const connectDB = require("./config/db"); // Import the function


connectDB(); // Connect to MongoDB
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
// app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});