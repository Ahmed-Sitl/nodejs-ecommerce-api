// import dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

// apply middleware
dotenv.config({ path: ".env" });
app.use(express.json());

// connect to MongoDB
const db = process.env.MONGODB_URI;
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// create category model
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date,
});

const Category = mongoose.model("Category", categorySchema);

// apply routes

app.post("/", (req, res) => {
  const category = new Category(req.body);
  category.save();
  res.send(category);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start server
// Define port from environment variable or default to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
