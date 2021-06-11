import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from './routes/user.js'; 

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.get("/", (req, res) => res.send("Hello to our memories api !!!"));
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

//Post routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((e) => console.log(e));
mongoose.set("useFindAndModify", false);
