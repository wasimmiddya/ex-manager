import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config()

// configuration for cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
    try {

        if (!localFilePath) {
            console.log('Path not found!!!');
            return null;
        }

        // uploading file on cloudinary
        const response = await cloudinary.uploader
            .upload(localFilePath)
            .then((res) => res);

        // console.log("cloudinary-response:: ", response);

        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
};
