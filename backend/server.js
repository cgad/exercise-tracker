// REST API server

// require dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// load environmental variables
require("dotenv").config();

// initialize express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // send and receive data as json - for .post() requests

// connect to MongoDB Atlas so server can access DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); // flags b/c MongoDB Node.js driver rewrote some code, deprecated things
const connection = mongoose.connection;
// open connetion to DB
connection.once("open", () => {
  console.log("MongoDB database connection successfully established");
});

// require backend api routes
const usersRouter = require("./routes/users.api");
const exercisesRouter = require("./routes/exercises.api");

// add routes as middleware
app.use("/users", usersRouter); // /users endpoints
app.use("/exercises", exercisesRouter); // /exercises endpoints

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
