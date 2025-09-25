/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from "mongoose";

import { TNotice } from "./notice.interface";

const noticeSchema = new Schema<TNotice>(
  {
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Notice = model<TNotice>("Notice", noticeSchema);
