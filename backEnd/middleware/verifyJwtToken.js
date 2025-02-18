const jwt = require("jsonwebtoken");
const BlackListToken = require("../models/blackListToken.model");

const verifyJwtToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlackListToken.findOne({ token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Token BlackListed" });
  }

  try {
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token Expired" });
        } else {
          return res.status(401).json({ message: "Invalid Token" });
        }
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = verifyJwtToken;
