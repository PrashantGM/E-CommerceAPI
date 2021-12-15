require("dotenv").config();
require("express-async-errors");
const express = require("express");
const server = express();
const morgan = require("morgan");

//database connection with mongodb atlas
const dbConnect = require("./database/connect");

//routers
const authRouter = require("./routes/authRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

server.use(morgan("tiny"));
server.use(express.json());

server.get("/", (req, res) => {
  res.send("e-commerce api");
});

server.use("/api/v1/auth", authRouter);

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
