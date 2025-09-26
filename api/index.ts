import serverless from "serverless-http";
import app from "../src/app";
import config from "../src/app/config";
import { connectDB } from "../src/app/config/db";

// Middleware to ensure MongoDB is connected for every request
app.use(async (req, res, next) => {
  try {
    await connectDB(config.database_url as string);
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: err,
    });
  }
});

export const handler = serverless(app);
