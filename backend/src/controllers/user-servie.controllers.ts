import { Response } from "express";
import { asyncHandler } from "../utils/async_handler";
import { RequestDataBody, TypedRequest } from "../@types";
import { ApiResponse } from "../utils/api_response.utils";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../../prisma/prisma-client";
import fs from "fs";
import { ApiError } from "../utils/api_err.utils";

const uploadMultipleImagesOnCloudinary = async (file: string) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res?.status(500).send("Failed to upload images");
            fs.unlinkSync(file);
            resolve(res?.secure_url);
        });
    });
};

const createUserRequests = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        let rawData = JSON.parse(req.body?.data);

        if (req.user?.role !== "USER")
            throw new ApiError(401, "Only 'Users' can create Request-Claims");

        if (req.files.receiptFiles)
            fs.unlinkSync(req.files?.receiptFiles[0].path);

        // Logic for uploading receipt images on cloudinary
        /* let files = req.files?.receiptFiles;
        const urls: Array<string> = [];

        for (let file of files) {
            const { path } = file;
            const url = await uploadMultipleImagesOnCloudinary(path);
            urls?.push(url as string);
        } */

        rawData = rawData.map((el: RequestDataBody, idx: number) => ({
            expenditure: el.expenditure,
            amount_claimed: el.amountClaimed,
            /* receipt: urls[idx], */
            submitted_on: new Date().toLocaleDateString(),
            uid: req.user?.id,
        }));

        const dbRes = await prisma.request.createMany({ data: rawData });

        return res
            .status(201)
            .json(new ApiResponse(200, "Successfull!", dbRes));
    }
);

const getAllUserRequests = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const id = req.user?.id;

        const data = await prisma.request.findMany({ where: { uid: id } });

        return res
            .status(200)
            .json(new ApiResponse(200, "Data fetch successfully", data));
    }
);




export { createUserRequests, getAllUserRequests };
