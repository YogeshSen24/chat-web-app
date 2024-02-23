import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.util.js";
const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(400).send("Please Login to send message!!!");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) res.status(401).send("Auth failed");
  const user = await User.findById(decoded.userId).select("-password");
  if (!user) res.status(401).send("Invalid User!!!!");
  req.user = user;
  next();
});

export { verifyUser };
