/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { CareerControllers } from "./career.controller";
import auth from "../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  CareerControllers.getAllCareer
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
CareerControllers.getSingleCareer
);
router.post(
  "/",
  auth("admin"),
CareerControllers.createCareer
);

router.patch(
  "/:id",
  auth("admin"),
CareerControllers.updateCareer
);
router.delete(
  "/:id",
  auth("admin"),
CareerControllers.deleteCareer
);



export const CareerRoutes = router;
