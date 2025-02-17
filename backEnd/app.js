require("dotenv").config();
const express = require("express");

const app = express();
const db = require("./config/db");
db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");

app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
