import { Types } from "mongoose";

export interface NewsModule {
    _id: Types.ObjectId;
    title: string;
    content: string;
    images: string[];
    additionalFile:string;
    createdAt: string;
    
  }