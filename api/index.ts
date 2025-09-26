import serverless from "serverless-http";
import app from "../src/app";
import config from "../src/app/config";
import { connectDB } from "../src/app/config/db";

// Connect to MongoDB (serverless safe)
connectDB(config.database_url as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

export const handler = serverless(app);
