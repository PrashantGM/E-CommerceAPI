require("dotenv").config();
require("express-async-errors");
const express = require("express");
const server = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//database connection with mongodb atlas
const dbConnect = require("./database/connect");

//routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

server.use(morgan("tiny"));
server.use(express.json());
server.use(cookieParser(process.env.JWT_SECRET));
server.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce api");
});

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);

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
