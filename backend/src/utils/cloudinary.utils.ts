import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) {
            return null;
        }

        // uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        return response;
    } catch (error) {
        return null;
    } finally {
        // after file uploadind file, delete the local file from the 'public/temp' directory
        fs.unlinkSync(localFilePath);
    }
};
