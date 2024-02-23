import jwt from "jsonwebtoken";
import {asyncHandler} from "./asyncHandler.util.js"

 async function generateTokenAndSaveCookie(userId, res) {
  try {
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    if(token){
      console.log(token);
      // res.write("token", token, {
      //   maxAge: null,
      //   httpOnly: true,
      //   samesite: "strict",
      // });
      res.cookie("token", token, {
        httpOnly: true,
        samesite: "strict",
      })

      console.log("cookie added",res.cookie)
      
    }
  } catch (error) {
    console.log(error);
  }
}

export { generateTokenAndSaveCookie };
