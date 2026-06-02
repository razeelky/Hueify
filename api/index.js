import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log("MongoDB  Error",err.message);
});

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://hueify-snowy.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);