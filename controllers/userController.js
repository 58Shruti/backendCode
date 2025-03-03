const bcrypt = require("bcryptjs");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const SECRET_KEY =process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: "All fields are required" });
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    cloudinary.uploader.upload_stream({ folder: "user_profiles" }, async (error, result) => {
    
      if (error) return res.status(500).json({ message: "Upload failed", error });
      const newUser = new User({ name, email, profileImage: result.secure_url, password });
      await newUser.save();
      res.status(201).json({ message: "User registered", user: newUser });
    }).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) 
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });
     // Generate JWT token
     const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, 
      {
      expiresIn: "90h", // Token expires in 1 hour
    }
  );
    res.json({ message: "Login successful" , token});
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { name, username, bio, education, jobTitle } = req.body;
    const userId = req.user.userId; // Get user ID from JWT

    if (!name || !username || !bio || !education || !jobTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the username is already taken (excluding the current user)
    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Find and update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, username, bio, education, jobTitle },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.filterUsers = async (req, res) => {
  try {
    const { education, jobTitle } = req.body; // Receive filter criteria 
    let filter = {};
    if (education) filter.education = education;
    if (jobTitle) filter.jobTitle = jobTitle;

    // Fetch users based on filters
    const filteredUsers = await User.find(filter);
    const totalUsers = filteredUsers.length; // Get the count of users
    res.status(200).json({ totalUsers , filteredUsers });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.getUsersOrSearchProfiles = async (req, res) => {

  try {
    const { name } = req.body; // Get search query from request body

    let query = {}; // Default: get all users

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    const users = await User.find(query);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

