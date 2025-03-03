// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt
// const app = express();
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// //  Multer setup for file handling
// const storage = multer.memoryStorage(); // Store file in memory before uploading
// const upload = multer({ storage });

// // MongoDB Connection
// mongoose
//   .connect(
//     "mongodb+srv://shruti192304:tkN6jVg1obAKfbxZ@cluster0.ruyvr.mongodb.net/test",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// cloudinary.config({
//     cloud_name: "dewww5zx3",
//     api_key: "578334518175639",
//     api_secret: "xM1La7OY3ACqurltL5x-wMDnKt0",
//   });

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   profileImage: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);


// // Define Profile Schema
// const profileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   bio: { type: String, required: true, maxlength: 200 },
//   education: { type: String, required: true },
//   jobTitle: { type: String, required: true },
// });

// // Profile Model
// const Profile = mongoose.model("Profile", profileSchema);

// // ✅ get  users data from MongoDB
// app.get("/allUsers",async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Register Endpoint
// app.post("/register", upload.single("profileImage"), async (req, res) => {

//   try {
//     console.log(req.file  , " req.file>>>");
//     const { email, password, name } = req.body;
//     if (!email || !password || !name ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // console.log("🔒 Hashing password...");
//     // const hashedPassword = await bcrypt.hash(password, 10);

//    // Upload image to Cloudinary
//    cloudinary.uploader.upload_stream(
//     { folder: "user_profiles" },
//     async (error, result) => {

//       if (error) {
//         console.error("Cloudinary Upload Error:", error);
//         return res.status(500).json({ message: "Upload failed", error });
//       }

//       // Save user with Cloudinary image URL
//       const newUser = new User({
//         name,
//         email,
//         profileImage: result.secure_url,
//         password,
//       });

//       await newUser.save();

//       res.status(201).json({ message: "User registered", user: newUser });
//     }
//   ).end(req.file.buffer); // Send file buffer to Cloudinary
//   } catch (err) {
//     console.error("❌ Error:", err);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: err.message });
//   }
// });

// // Login Endpoint
// app.post("/login", upload.none(), async (req, res) => {
//   console.log(req.body, " req.body.............."); // Debugging

//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const isMatch = await User.findOne({ password });
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // const isMatch = await compare(password, user.password);
//     // if (!isMatch) {
//     //   return res.status(400).json({ message: "Invalid credentials" });
//     // }

//     res.json({ message: "Login successful" });
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });



// // ✅ API to Create a User Profile
// app.post("/profile", upload.none(), async (req, res) => {
//   try {
//     const { name, username, bio, education, jobTitle } = req.body;

//     // Check if all fields are provided
//     if (!name || !username || !bio || !education || !jobTitle) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the username already exists
//     const existingUser = await Profile.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

//     // Create new profile
//     const newProfile = new Profile({ name, username, bio, education, jobTitle });
//     await newProfile.save();

//     res.status(201).json({ message: "Profile created successfully", profile: newProfile });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });


// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
