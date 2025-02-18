const User = require("../models/user.model");

const registerUser = async ({ firstName, lastName, email, password }) => {
  try {
    const newUser = await User.create({
      userName: {
        firstName,
        lastName,
      },
      email,
      password,
    });
    return newUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { registerUser };
