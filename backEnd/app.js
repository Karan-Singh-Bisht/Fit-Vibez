require("dotenv").config();
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require("node-cron");
const db = require("./config/db");
db();

cron.schedule("*/5 * * * *", () => {
  exec("curl https://fit-vibez.onrender.com");
  console.log("Corn running....");
});

app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("./routes/user.routes");
const trackRoute = require("./routes/track.routes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/track", trackRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
