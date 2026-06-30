const User = require("../../model/users/user.model");
const transporter = require("../../utils/mail");
const crypto = require("crypto");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Attention

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset your password",
      html: `<h2>Reset your password</h2>
      <p>click on the link to reset your password</p>
      <a href="${resetUrl}">Reset your password</a>`,
    });
    res.status(200).json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = forgotPassword;
