/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1588815",
  key: "271e6288274030d8251a",
  secret: "f4875429002ed9e85c90",
  cluster: "ap2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gramausbd.netlify.app",
      "https://gramausbd.org"
      
    ],
    credentials: true,
  })
);


// application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  return res.json({ message: "working nicely" });
};

app.get("/", test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
