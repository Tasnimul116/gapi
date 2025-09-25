/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { NewsControllers } from "./news.controller";
import auth from "../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  NewsControllers.getAllNews
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
NewsControllers.getSingleNews
);
router.post(
  "/",
  auth("admin"),
NewsControllers.createNews
);

router.patch(
  "/:id",
  auth("admin"),
NewsControllers.updateNews
);
router.delete(
  "/:id",
  auth("admin"),
NewsControllers.deleteNews
);



export const NewsRoutes = router;
