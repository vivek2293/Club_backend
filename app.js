const express = require("express");
const app = express();
require("dotenv").config();
const connect = require("./connect");

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});