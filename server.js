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

// // Export the Express app for Vercel
// module.exports = app;

// const express = require("express");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Sample route
// app.get("/", (req, res) => {
//   res.send("Hello from Vercel!");
// });

// Export the Express app
module.exports = app;
