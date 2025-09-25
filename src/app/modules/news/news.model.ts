import { model, Schema } from "mongoose";

import { string } from "zod";

import { NewsModule } from "./news.interface";

const newsSchema = new Schema<NewsModule>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    images: {
      type: [{type: String}],
    },
    additionalFile:{
      type: String
    }
    
  },
  {
    timestamps: true,
  }
);

export const News = model<NewsModule>("News", newsSchema);
