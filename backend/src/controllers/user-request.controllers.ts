import { Request, Response } from "express";
import { asyncHandler } from "../utils/async_handler";
import { RequestDataBody, TypedRequest } from "../@types";
import { ApiResponse } from "../utils/api_response.utils";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../../prisma/prisma-client";
import fs from "fs";

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
        let data = JSON.parse(req.body?.data);
        let files = req.files?.receiptFiles;

        const urls: Array<string> = [];

        for (let file of files) {
            const { path } = file;
            const url = await uploadMultipleImagesOnCloudinary(path);
            urls?.push(url as string);
        }

        data = data.map((el: RequestDataBody, idx: number) => ({
            expenditure: el.expenditure,
            amount_claimed: el.amountClaimed,
            receipt: urls[idx],
            submitted_on: new Date().toLocaleDateString()
        }));

        const dbResponse = await prisma.request.createMany({ data });

        return res.status(201).json(new ApiResponse(200, "Successfull!", dbResponse));
    }
);

export { createUserRequests };
