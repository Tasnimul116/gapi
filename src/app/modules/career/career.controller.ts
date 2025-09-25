import { RequestHandler } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CareerServices } from "./career.service";

const getAllCareer: RequestHandler = catchAsync(async (req, res) => {
  const result = await CareerServices.getAllCareerFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Careers retrived succesfully",
    data: result,
  });
});
const getSingleCareer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CareerServices.getSingleCareerFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Career is retrieved succesfully",
    data: result,
  });
});

const updateCareer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CareerServices.updateCareerIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Career is updated succesfully",
    data: result,
  });
});
const deleteCareer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CareerServices.deleteCareerIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Career is deleted succesfully",
    data: result,
  });
});

const createCareer = catchAsync(async (req, res) => {
  const result = await CareerServices.createCareerIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Career Created succesfully",
    data: result,
  });
});

export const CareerControllers = {
  getAllCareer,
  getSingleCareer,
  updateCareer,
  createCareer,
  deleteCareer
};
