const User = require("../models/user.model");

const registerUser = async ({ userName, email, password }) => {
  try {
    const newUser = await User.create({
      userName: {
        firstName: userName.firstName,
        lastName: userName.lastName,
      },
      email,
      password,
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

module.exports = { registerUser };
