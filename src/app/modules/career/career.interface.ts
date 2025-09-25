import { Types } from "mongoose";

export interface CareerModule {
    _id: Types.ObjectId;
    title: string;
    deadline: Date;
    content: string;
   
    createdAt: string;
    
  }