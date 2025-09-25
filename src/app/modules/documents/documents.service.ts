import path from 'path';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const UploadDocument = async (file, payload) => {
  const { entityId, file_type } = payload;

  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No file provided');
  }

  const { name: rawName, ext } = path.parse(file.originalname);

  // Clean the name: replace spaces and remove any unsafe characters if needed
  const cleanName = rawName.replace(/\s+/g, '-'); // replace spaces with hyphens

  // Add timestamp to avoid name collision
  const imageName = `${cleanName}-${Date.now()}`;
  const filePath = path.resolve(file.path);

  // Send to Cloudinary (pass extension if you want to include it in the public_id)
  try {
    // Send to Cloudinary (pass extension if you want to include it in the public_id)
    const result: any = await sendImageToCloudinary(imageName, filePath); // or pass ext if needed
    const fileUrl = result.secure_url;

    return { entityId, file_type, fileUrl };
  } catch (error) {
    console.error("Error during file upload:", error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }
};

export const UploadDocumentService = {
  UploadDocument,
};
