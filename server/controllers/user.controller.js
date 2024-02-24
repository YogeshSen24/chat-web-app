import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const getUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const allUsers = await User.find({ _id: { $ne: id } }).select( //currsent user to be removed
    "-password"
  );
  res.status(200).send(allUsers);
});

export { getUser };
