const User = require("../../model/users/user.model");

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(req.user.id);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete user",
    });
  }
};
module.exports = deleteUser;
