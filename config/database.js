// connect to MongoDB
const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = { dbConnection };
