const User = require("../../model/users/user.model");
const bcrypt = require("bcrypt");
const { upload } = require("../../utils/cloudinary");
const fs = require("fs");
const registerUser = async (req, res) => {
  let img;
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload a profile image",
    });
  }

  try {
    const result = await upload(req.file.path, {
      folder: "user",
    });
    img = result.secure_url;
    if (img) {
      fs.unlinkSync(req.file.path);
    }
    const { firstName, lastName, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const existingUserPhone = await User.findOne({ phone });
    if (existingUserPhone) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
      email,
      phone,
      password: hashedPassword,
      profileImage: img,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to register user",
      error,
    });
  }
};

module.exports = registerUser;
