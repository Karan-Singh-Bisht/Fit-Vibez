const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    firstName: {
      type: String,
      required: true,
      minlength: [2, "First Name should be atleast 2 characters long"],
      maxlength: [50, "Max 50 characters allowed"],
    },
    lastName: {
      type: String,
      minlength: [2, "Last Name should be atleast 2 characters long"],
      maxlength: [50, "Max 50 characters allowed"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "Password should be atleast 6 characters long"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
