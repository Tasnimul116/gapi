import { model, Schema } from "mongoose";

import { string } from "zod";

import { CareerModule } from "./career.interface";

const CareerSchema = new Schema<CareerModule>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    deadline: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Career = model<CareerModule>("Career", CareerSchema);
