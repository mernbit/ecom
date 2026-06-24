const User = require("../../model/users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "User not found",
      });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = loginUser;
