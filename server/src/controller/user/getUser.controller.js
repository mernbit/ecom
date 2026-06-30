const User = require("../../model/users/user.model");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      session: req.user,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get user",
    });
  }
};

module.exports = getUser;
