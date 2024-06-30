require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const connectToDB = require("./dBConnect");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const brandRouter = require("./routes/brandRoute");
const Auth = require("./routes/Auth");
const userRouter = require("./routes/userRouter");
const CartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const passport = require("./auth/passportConfig");
const cookieparser = require("cookie-parser");
const { isAuth } = require("./service/common");

const server = express();
// Mongoose DataBase Connected
connectToDB();
// Middlwar
server.use(cookieparser());

server.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    exposedHeaders: ["X-Total-Count"],
    credentials: true,
  })
);
server.use(express.static(path.resolve(__dirname, 'build')));

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(express.json());

// Get path
server.get("/", (req, res) => {
  res.status(200).send({ message: "Server Start " });
});

// Router
server.use("/products", productRouter);
server.use("/categories", categoryRouter);
server.use("/brands", brandRouter);
server.use("/users", isAuth(), userRouter);
server.use("/auth", Auth);
server.use("/cart", isAuth(), CartRouter);
server.use("/orders", isAuth(), orderRouter);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(
    `\n Server Start on port ${port} ___🚀___ http://localhost:8080/`
  );
});
