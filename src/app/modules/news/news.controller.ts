import { RequestHandler } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NewsServices } from "./news.service";

const getAllNews: RequestHandler = catchAsync(async (req, res) => {
  const result = await NewsServices.getAllNewsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Newss retrived succesfully",
    data: result,
  });
});
const getSingleNews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NewsServices.getSingleNewsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News is retrieved succesfully",
    data: result,
  });
});

const updateNews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NewsServices.updateNewsIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News is updated succesfully",
    data: result,
  });
});
const deleteNews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NewsServices.deleteNewsIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News is deleted succesfully",
    data: result,
  });
});

const createNews = catchAsync(async (req, res) => {
  const result = await NewsServices.createNewsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News Created succesfully",
    data: result,
  });
});

export const NewsControllers = {
  getAllNews,
  getSingleNews,
  updateNews,
  createNews,
  deleteNews
};
