import { RequestHandler } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PublicationServices } from "./publication.service";

const getAllPublication: RequestHandler = catchAsync(async (req, res) => {
  const result = await PublicationServices.getAllPublicationFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Publications retrived succesfully",
    data: result,
  });
});
const getSinglePublication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PublicationServices.getSinglePublicationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Publication is retrieved succesfully",
    data: result,
  });
});

const updatePublication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PublicationServices.updatePublicationIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Publication is updated succesfully",
    data: result,
  });
});
const deletePublication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PublicationServices.deletePublicationIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Publication is deleted succesfully",
    data: result,
  });
});

const createPublication = catchAsync(async (req, res) => {
  const result = await PublicationServices.createPublicationIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Publication Created succesfully",
    data: result,
  });
});

export const PublicationControllers = {
  getAllPublication,
  getSinglePublication,
  updatePublication,
  createPublication,
  deletePublication
};
