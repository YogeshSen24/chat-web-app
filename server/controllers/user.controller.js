import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const allUsers = await User.find({ _id: { $ne: [userId] } }).select(
    "-password"
  );
  res.status(200).send(allUsers);
});

export { getUser };
