const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URI);
    return Promise.resolve(`Server connected to database ${connection.host}`);
  } catch (error) {
    return Promise.reject(
      `Some Error Occurred While Connecting to DB ${error}`
    );
  }
};

module.exports = connectDB;
