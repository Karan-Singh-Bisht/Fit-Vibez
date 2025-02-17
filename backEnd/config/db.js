const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/fitVibez`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Couldn't connect to MongoDB");
    process.exit(1);
  }
};

module.exports = db;
