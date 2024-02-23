import { asyncHandler } from "../utils/asyncHandler.util.js";
import User from "../models/user.model.js";
import { generateTokenAndSaveCookie } from "../utils/generateToken.js";

const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    res.status(400).send("Please fill all the required field");
  const user = await User.findOne({ phone });
  if (!user) {
    res.status(401).end("Number not found!!!");
  }
  const isValid = await user.checkPassword(password);
  if (!isValid) res.status(401).end("Invalid Password!!!");
  const cookie = generateTokenAndSaveCookie(String(user._id), res);
  if (cookie) {
    res.send(user._id);
  }
});

const signup = asyncHandler(async (req, res) => {
  //get the data from the req
  const { name, phone, password, cpassword } = req.body;
  //validate the info
  if (!phone || !name || !password || !cpassword) {
    res.status(400).send("Please fill all the required feild");
  }
  //check if the user already exist(phone)
  const isExist = await User.findOne({ phone });
  if (isExist) {
    res.status(402).send("Number Already Exist , Please Login !!!!");
  }
  // if(phone.length<10){
  //     return  res.status(401).send("Invalid Number")
  // }
  if (password !== cpassword) {
    res.status(401).send("Passwords dosen't match");
  }

  //create token and add  to the database
  const user = new User({
    name,
    phone,
    password,
  });
  if (user) {
    generateTokenAndSaveCookie(user._id, res);
    await user.save();
    res.status(200).send("User Created");
  }
});

const logout = (req, res) => {
  res
    .cookie("token", "", {
      maxAge: 0,
    })
    .send("Logged out !!!");
};

export { login, signup, logout };
