/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";

import { NoticeControllers } from "./notice.controller";
import auth from "../../middlewares/auth";

const router = express.Router();
router.get(
  "/",
  NoticeControllers.getAllNotice
);
router.get(
  "/:id",
  auth("admin",),
NoticeControllers.getSingleNotice
);
router.post(
  "/",
  auth("admin",),
NoticeControllers.createNotice
);


router.delete(
  "/:id",
  auth("admin",),
NoticeControllers.deleteNotice
);
router.patch(
  "/:id",
  auth("admin",),
NoticeControllers.updateNotice
);


export const NoticeRoutes = router;
