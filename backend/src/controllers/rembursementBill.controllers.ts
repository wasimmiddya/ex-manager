import { Response } from "express";
import { asyncHandler } from "../utils/async_handler";
import { RequestDataBody, TypedRequest } from "../@types";
import { ApiResponse } from "../utils/api_response.utils";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../../prisma/prisma-client";
import fs from "fs";
import { ApiError } from "../utils/api_err.utils";
import { Role, Status } from "@prisma/client";

const uploadMultipleImagesOnCloudinary = async (file: string) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res?.status(500).send("Failed to upload images");
            fs.unlinkSync(file);
            resolve(res?.secure_url);
        });
    });
};

const createRembursementBillForUser = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        let rawData = JSON.parse(req.body?.data);

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

const getRembursementBillForUser = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const id = req.user?.id;

        const data = await prisma.request.findMany({ where: { uid: id } });

        return res
            .status(200)
            .json(new ApiResponse(200, "Data fetch successfully", data));
    }
);

const getRembursementBillForAdmin = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const data = await prisma.request
            .findMany({
                relationLoadStrategy: "join",
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true,
                            avater: true,
                        },
                    },
                },
            })
            .catch((err) => {
                console.log(err);
                return null;
            });

        if (!data) {
            throw new ApiError(500, "Connot fetch data for admin");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "All bills are successfully retrieved!!!",
                    data
                )
            );
    }
);

const getSingleUserBill = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const id = Number(req.params.id);

        if (!id) {
            throw new ApiError(400, "ID not provided");
        }

        console.log({ id });

        const response = await prisma.request
            .findUnique({ where: { id } })
            .catch((err) => {
                console.log(err);
                return null;
            });

        console.log(response);

        if (!response) {
            throw new ApiError(500, "Failed to fetch single bill for user");
        }

        return res.status(200).json(new ApiResponse(200, "Success", response));
    }
);

const getSingleBillForAdmin = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const id = Number(req.params?.id);

        if (!id) {
            throw new ApiError(400, "Id not provided");
        }

        const data = await prisma.request
            .findUnique({
                where: { id },
                select: {
                    id: true,
                    expenditure: true,
                    amount_claimed: true,
                    submitted_on: true,
                    status: true,
                    user: {
                        select: {
                            email: true,
                            avater: true,
                            full_name: true,
                            role: true,
                        },
                    },
                },
            })
            .catch((err) => {
                console.log(err);
                return null;
            });

        if (!data) {
            throw new ApiError(500, "Can't fetch data");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, "Fetch successfully!", data));
    }
);

const updateBillStatusByAdmin = asyncHandler(
    async (
        req: TypedRequest<{
            id: any;
            status: Status;
            amount_approved: number;
        }>,
        res: Response
    ) => {
        const { id, status, amount_approved } = req.body;

        const response = await prisma.request
            .update({
                where: { id },
                data: {
                    status: {
                        set: status,
                    },
                    amount_approved: {
                        set: amount_approved,
                    },
                    approval_date: {
                        set: new Date().toLocaleDateString(),
                    },
                },
                select: {
                    status: true,
                },
            })
            .catch((err) => {
                console.log(err);
                return null;
            });

        console.log(response);

        if (!response) {
            throw new ApiError(500, "Can't update approval record");
        }

        return res.status(200).json(new ApiResponse(200, "Success", response));
    }
);

const getAggregateBillByUser = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const id = req.user?.id;

        // fetch the record of a particular user
        const data = await prisma.request
            .aggregate({
                _count: {
                    _all: true,
                },
                _sum: {
                    amount_claimed: true,
                    amount_approved: true,
                },
                where: { uid: id },
            })
            .catch((err) => {
                console.log(err);
                return null;
            });

        if (!data) {
            throw new ApiError(500, "Can't fetch aggregated data by user");
        }

        return res.status(200).json(new ApiResponse(200, "Successfull!", data));
    }
);


const getAggregateBillByAdmin = asyncHandler(
    async (_: TypedRequest<any>, res: Response) => {

        const data = await prisma.request.aggregate({
            _count: {
                _all: true
            },
            _sum: {
                amount_claimed: true,
                amount_approved: true
            }
        }).catch((err) => {
            console.log(err);
            return null;
        });

        if(!data) {
            throw new ApiError(500, "Can't fetch data");
        }

        return res.status(200).json(new ApiResponse(200, "Successfull", data))
    }
)


export {
    createRembursementBillForUser,
    getRembursementBillForUser,
    getRembursementBillForAdmin,
    getSingleUserBill,
    getSingleBillForAdmin,
    updateBillStatusByAdmin,
    getAggregateBillByUser,
    getAggregateBillByAdmin
};
