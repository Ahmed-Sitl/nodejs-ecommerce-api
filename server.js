// import dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const { dbConnection } = require("./config/database");
const { routerCategory } = require("./routes/categoryRoute");

// apply middleware
dotenv.config({ path: ".env" });
app.use(express.json());

// connect to MongoDB
dbConnection();

// logging middleware
app.use(morgan("dev"));

// apply routes
app.use("/api/v1/categories", routerCategory);

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
