const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shruti192304:tkN6jVg1obAKfbxZ@cluster0.ruyvr.mongodb.net/test" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
