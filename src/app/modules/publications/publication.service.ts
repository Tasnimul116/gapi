import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { Publication } from "./publication.model";
import { PublicationSearchableFields } from "./publication.constant";
import { PublicationModule } from "./publication.interface";


const getAllPublicationFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Publication.find(), query)
    .search(PublicationSearchableFields)
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

const getSinglePublicationFromDB = async (id: string) => {
  const result = await Publication.findById(id);
  return result;
};


const createPublicationIntoDB = async (payload: PublicationModule) => {
    try {
      
      const result = await Publication.create(payload);
      return result;
    } catch (error: any) {
      console.error("Error in createPublicationIntoDB:", error);
  
      // Throw the original error or wrap it with additional context
      if (error instanceof AppError) {
        throw error;
      }
  
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to create Publication");
    }
  };


const updatePublicationIntoDB = async (id: string, payload: Partial<PublicationModule>) => {
  const publication = await Publication.findById(id);

  if (!publication) {
    throw new AppError(httpStatus.NOT_FOUND, "Publication not found");
  }


  const result = await Publication.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};



const deletePublicationIntoDB = async (id: string) => {
  const publication = await Publication.findById(id);

  if (!publication) {
    throw new AppError(httpStatus.NOT_FOUND, "Publication not found");
  }


  const result = await Publication.findByIdAndDelete(id);

  return result;
};



export const PublicationServices = {
    getAllPublicationFromDB,
    getSinglePublicationFromDB,
    updatePublicationIntoDB,
    createPublicationIntoDB,
    deletePublicationIntoDB
  
};

  