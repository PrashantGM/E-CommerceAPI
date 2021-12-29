require("dotenv").config();
require("express-async-errors");
const express = require("express");
const server = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//database connection with mongodb atlas
const dbConnect = require("./database/connect");

//routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

server.set("trust proxy", 1);
// server.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
server.use(helmet());
server.use(cors());
server.use(xss());
server.use(mongoSanitize());

server.use(morgan("tiny"));
server.use(express.json());
server.use(cookieParser(process.env.JWT_SECRET));
server.use(express.static("./public"));
server.use(fileUpload());

server.use("/api/v1/auth", authRouter);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/products", productRouter);
server.use("/api/v1/reviews", reviewRouter);
server.use("/api/v1/orders", orderRouter);

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
