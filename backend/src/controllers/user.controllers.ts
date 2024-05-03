import { Response, NextFunction } from "express";
import { asyncHandler } from "../utils/async_handler";
import { RequestBodyUser, TypedRequest, UserRole } from "../@types";
import { ApiError } from "../utils/api_err.utils";
import { DEFAULT_AVATER_URL, EMAIL_REGEX } from "../constants";
import prisma from "../../prisma/prisma-client";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { ApiResponse } from "../utils/api_response.utils";

// ---------------Controller for handling user registration-----------------
const registerUser = asyncHandler(
    async (
        req: TypedRequest<RequestBodyUser>,
        res: Response,
        next: NextFunction
    ) => {
        // checking if all the fields are filled up or not
        const { fname, lname, email, password, confirm_password, role } =
            req.body;
        

        // if some of the fields send by the user in request body is empty, then throw api error
        if (
            [fname, lname, email, password, confirm_password].some(
                (val, ind, arr) => val.trim() === ""
            )
        ) {
            throw new ApiError(401, "Some fields are missing...");
        }

        // check whether the email is in currect format or not i.e 'example@gmail.com'
        if (!EMAIL_REGEX.test(email)) {
            throw new ApiError(400, "Incurrect email format provided");
        }

        // check if the user is already exist in the database
        const isUserExisted = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (isUserExisted) {
            throw new ApiError(401, "User with this email address is already exist.");
        }

        let avater = null;
        let avaterLocalpath = req.file?.path;

        // upload avater image on cloudinary
        if (avaterLocalpath) {
            avater = await uploadOnCloudinary(avaterLocalpath);
        }

        console.log(avater?.secure_url);
        

        // create new user in the database
        const user = await prisma.user.create({
            data: {
                fname,
                lname,
                email,
                password,
                role: role as any,
                avater: avater ? avater.url : (DEFAULT_AVATER_URL as any),
            },
            select: {
                full_name: true,
                email: true,
                role: true,
                avater: true,
            },
        });

        if (!user) {
            throw new ApiError(
                500,
                "Something went wrong while creating user information."
            );
        }

        return res
            .status(200)
            .json(new ApiResponse(200, "User created successfully!", user));
    }
);

export { registerUser };
