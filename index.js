import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
var app = express();

dotenv.config();
const PORT = process.env.PORT || 5000

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})

// mongoose.set("useFindAndModify", false);
