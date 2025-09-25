import { Types } from "mongoose";

export interface PublicationModule {
    _id: Types.ObjectId;
    title: string;
    content: string;
    image: string
   
    createdAt: string;
    
  }