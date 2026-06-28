const bcrypt = require("bcrypt");
const User = require("../../model/users/user.model");

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $lt: Date.now() },
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = resetPassword;
