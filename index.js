const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
require("dotenv").config();

const DB = process.env.DB;

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("my speed");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`connected at port ${PORT}`);
});
