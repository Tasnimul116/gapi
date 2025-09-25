/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";
import e from "express";


export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "student" | "applicant";
  status: "block" | "active"; // assuming UserStatus enum includes these
  isDeleted: boolean;
  authorized: boolean;
  address?: string;
  image?: string;
  phone?: string;
  googleUid?: string;
  otp?: string;
  refreshToken?: string;
  otpExpiry: Date;
  isUsed: boolean;
  isValided: boolean;
  isCompleted: boolean;
 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
