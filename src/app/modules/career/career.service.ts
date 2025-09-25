import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { Career } from "./career.model";
import { CareerSearchableFields } from "./career.constant";
import { CareerModule } from "./career.interface";


const getAllCareerFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Career.find(), query)
    .search(CareerSearchableFields)
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

const getSingleCareerFromDB = async (id: string) => {
  const result = await Career.findById(id);
  return result;
};


const createCareerIntoDB = async (payload: CareerModule) => {
    try {
      
      const result = await Career.create(payload);
      return result;
    } catch (error: any) {
      console.error("Error in createCareerIntoDB:", error);
  
      // Throw the original error or wrap it with additional context
      if (error instanceof AppError) {
        throw error;
      }
  
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to create Career");
    }
  };


const updateCareerIntoDB = async (id: string, payload: Partial<CareerModule>) => {
  const career = await Career.findById(id);

  if (!career) {
    throw new AppError(httpStatus.NOT_FOUND, "Career not found");
  }


  const result = await Career.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};



const deleteCareerIntoDB = async (id: string) => {
  const career = await Career.findById(id);

  if (!career) {
    throw new AppError(httpStatus.NOT_FOUND, "Career not found");
  }


  const result = await Career.findByIdAndDelete(id);

  return result;
};



export const CareerServices = {
    getAllCareerFromDB,
    getSingleCareerFromDB,
    updateCareerIntoDB,
    createCareerIntoDB,
    deleteCareerIntoDB
  
};

  