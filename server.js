require("dotenv").config();
require("express-async-errors");
const express = require("express");
const server = express();

//database connection with mongodb atlas
const dbConnect = require("./database/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("e-commerce api");
});

//error handler middlewares
server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    server.listen(port, console.log(`Server is listening on port ${port}..`));
  } catch (error) {
    console.log(error);
  }
};
start();
