const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { register , login ,createProfile , getUsersOrSearchProfiles ,filterUsers} = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware"); // Import middleware

router.post("/register", upload.single("profileImage"), register);
router.post("/login", upload.none() , login);
router.post("/createProfile", authenticateUser , createProfile);
router.post("/search" , authenticateUser , getUsersOrSearchProfiles); // API endpoint for searching
router.post("/filterUsers" , authenticateUser , filterUsers); // API endpoint for filter

module.exports = router;