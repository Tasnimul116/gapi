/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import { connectDB } from "./app/config/db";
import config from "./app/config";

const app: Application = express();
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1588815",
  key: "271e6288274030d8251a",
  secret: "f4875429002ed9e85c90",
  cluster: "ap2",
  useTLS: true,
});

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// CORS
app.use(
  cors({
    origin: [
      "*",
      "http://localhost:5173",
      "https://gramausbd.netlify.app",
      "https://gramausbd.org",
    ],
    credentials: true,
  })
);


app.use("/api", async (req, res, next) => {
  try {
    await connectDB(config.database_url); // ensures connection is ready
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ success: false, message: "Database connection failed", error: err });
  }
}, router);


// Test route
app.get("/", async (req: Request, res: Response) => {
  return res.json({ message: "working nicely" });
});

// Example Pusher route
app.post("/api/push", async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
    await pusher.trigger("my-channel", "my-event", { message });
    res.json({ success: true });
  } catch (err) {
    console.error("Pusher error:", err);
    res.status(500).json({ success: false, message: "Pusher trigger failed", error: err });
  }
});

// Application routes under /api
app.use("/api", router);

// Global error handler
app.use(globalErrorHandler);

// Not Found handler
app.use(notFound);

export default app;
