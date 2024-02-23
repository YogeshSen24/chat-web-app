import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
    },
    lastseen: {
      type: Date,
    },
    profilePic: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.checkPassword = async function (password) {
    const isTrue = await bcrypt.compare(password, this.password);
    return isTrue;
  };

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre");
  if (!user.isModified) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  console.log(user.password)
  return next()
});

const User = model("User", userSchema);



export default User;
