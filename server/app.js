const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/database/db");
const cors = require("./src/middlewares/cors/cors");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors);

const PORT = process.env.PORT || 8080;
connectDB()
  .then((message) => {
    console.log(message);
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
