/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { PublicationControllers } from "./publication.controller";
import auth from "../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  PublicationControllers.getAllPublication
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
PublicationControllers.getSinglePublication
);
router.post(
  "/",
  auth("admin"),
PublicationControllers.createPublication
);

router.patch(
  "/:id",
  auth("admin"),
PublicationControllers.updatePublication
);
router.delete(
  "/:id",
  auth("admin"),
PublicationControllers.deletePublication
);



export const PublicationRoutes = router;
