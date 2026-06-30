const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection established successfully");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

module.exports = connectDB;
