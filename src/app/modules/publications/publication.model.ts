import { model, Schema } from "mongoose";

import { string } from "zod";

import { PublicationModule } from "./publication.interface";

const PublicationSchema = new Schema<PublicationModule>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Publication = model<PublicationModule>(
  "Publication",
  PublicationSchema
);
