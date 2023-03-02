const express = require("express");
const connection = require("./config/connection")


const app = express();
const PORT = process.env.PORT || 4050;

app.get("/", (reg, res) => {
  res.send("hey");
});

app.listen(PORT, () => console.log("server running"));

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//import routes
const authRoute = require("./routes/auth/auth");
const homeRoute = require("./routes/home/home");
const categoryRoute = require("./routes/category/category");
const productRoute = require("./routes/product/product");
const cartRoute = require("./routes/cart/cart");
const addressRoute = require("./routes/address/address");
const paymentRouter = require("./routes/payment/payment");
const orderRouter = require("./routes/orders/orders");
const plansRouter = require("./routes/plans/plans");
const chitty = require("./routes/chitty/chitty")

//accessing enviroment variables
dotenv.config();

//connect database
mongoose.set('strictQuery', true)

connection()


app.use(express.json(), cors());

app.use("/api/users", authRoute);
app.use("/api/banner", homeRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/address",addressRoute);
app.use("/api/payment", paymentRouter);
app.use("/api/order", orderRouter);
app.use("/api/plans", plansRouter);
app.use("/api/chitty", chitty);
