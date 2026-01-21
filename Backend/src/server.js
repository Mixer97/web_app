const mongoose = require("mongoose");
const app = require("./app");

const PORT = 3000;
const MONGO_URI = "mongodb://mongo:27017/sports-app";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log("Server running on port ${PORT}");
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
