import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { News } from "./news.model";
import { NewsSearchableFields } from "./news.constant";
import { NewsModule } from "./news.interface";


const getAllNewsFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(News.find(), query)
    .search(NewsSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleNewsFromDB = async (id: string) => {
  const result = await News.findById(id);
  return result;
};


const createNewsIntoDB = async (payload: NewsModule) => {
    try {
      
      const result = await News.create(payload);
      return result;
    } catch (error: any) {
      console.error("Error in createNewsIntoDB:", error);
  
      // Throw the original error or wrap it with additional context
      if (error instanceof AppError) {
        throw error;
      }
  
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to create News");
    }
  };


const updateNewsIntoDB = async (id: string, payload: Partial<NewsModule>) => {
  const news = await News.findById(id);

  if (!news) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }


  const result = await News.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};



const deleteNewsIntoDB = async (id: string) => {
  const news = await News.findById(id);

  if (!news) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }


  const result = await News.findByIdAndDelete(id);

  return result;
};



export const NewsServices = {
    getAllNewsFromDB,
    getSingleNewsFromDB,
    updateNewsIntoDB,
    createNewsIntoDB,
    deleteNewsIntoDB
  
};

  