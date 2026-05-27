require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// CHECK ENV
console.log(process.env.MONGO_URI);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/api/payments", paymentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});