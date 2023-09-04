import * as crypto from "crypto";
import { cloudinary } from "../libs/cloudinary";

export const getSHA256 = (input: string): string => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

export const submitImgCloudinary = async (imageURL: string) => {
  try {
    return await cloudinary.uploader.upload(imageURL);
  } catch (error) {
    console.log(error);
  }
};
