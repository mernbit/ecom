const User = require("../../model/users/user.model");

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, email, phone, firstName, lastName, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, phone, firstName, lastName, profileImage },
      { new: true },
    ).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("User found", user);
    return res
      .status(200)
      .json({ success: true, user, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in updating profile" });
  }
};
module.exports = updateProfile;
