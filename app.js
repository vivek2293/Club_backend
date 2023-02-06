const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connect = require("./connect");
const cors = require("cors");
const routes = require("./routes/route");

//Configuring dotenv
dotenv.config();

//Connecting database
connect(process.env.MONGO_URI);

//Using routes and middlewares
app.use(cors({ origin:'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", routes);

//Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});