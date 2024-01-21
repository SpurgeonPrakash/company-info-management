const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/database/db");
const cors = require("./src/middlewares/cors/cors");

const apiRoutes = require("./src/routes/api.routes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors);

app.use("/api/v1", apiRoutes);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  const statusCode = err.statusCode;
  const message = err.message;
  // const data = err.data;
  res.status(statusCode).json({
    message: message || "An unknown error occurred!",
    // data: data,
    // err: err.stack,
    // stack: err.actualError,
  });
});

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
