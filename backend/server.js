const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/userRoutes.js")
const chatRoute = require("./routes/chatRoutes.js")

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute)
app.use("/api/chats",chatRoute)


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
