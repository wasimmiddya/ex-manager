import { Response, CookieOptions } from "express";
import { asyncHandler } from "../utils/async_handler";
import { RequestBodyUser, TokenUserType, TypedRequest } from "../@types";
import { ApiError } from "../utils/api_err.utils";
import { DEFAULT_AVATER_URL, EMAIL_REGEX } from "../constants";
import prisma from "../../prisma/prisma-client";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import { ApiResponse } from "../utils/api_response.utils";
import jwt from "jsonwebtoken";
import { removeLocalFile } from "../utils/helper";

const getAccessAndRefreshToken = (user: TokenUserType) => {
    try {
        const accessToken = jwt.sign(
            user,
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKE_SECRET as string,
            { expiresIn: process.env.REFRESH_TOKE_EXPIRY }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate refresh and access token");
    }
};

// ---------------Controller for handling user registration-----------------
const registerUser = asyncHandler(
    async (req: TypedRequest<RequestBodyUser>, res: Response) => {
        // checking if all the fields are filled up or not
        const { fname, lname, email, password, role, mobile } = req.body;

        // console.log(req.body);

        // if some of the fields send by the user in request body is empty, then throw api error
        if (
            [fname, lname, email, password, mobile].some(
                (val, idx, arr) => val.trim() === ""
            )
        ) {
            // remove, if there is any unused local image file
            removeLocalFile(req.files?.avater[0].path);
            throw new ApiError(400, "Some fields are missing...");
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
            removeLocalFile(req.files?.avater[0].path);
            throw new ApiError(
                409,
                "User with this email address is already exist."
            );
        }

        let avater = null;
        let avaterLocalpath = req.files?.avater[0].path;

        console.log("Image uploaded in local server");

        // console.log('localPath:: ', avaterLocalpath);

        // upload avater image on cloudinary
        if (avaterLocalpath) {
            avater = await uploadOnCloudinary(avaterLocalpath);
        }

        // console.log('avater:: ',avater);

        // create new user in the database
        const user = await prisma.user.create({
            data: {
                fname,
                lname,
                email,
                mobile,
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
            .status(201)
            .json(new ApiResponse(200, "User created successfully!", user));
    }
);

// --------------------Controller defined for user login or sign-in--------------------
const signInUser = asyncHandler(
    async (
        req: TypedRequest<{ email: string; password: string }>,
        res: Response
    ) => {
        const { email, password } = req.body;

        // check whether the has filled up all the necessory fields or not
        if (email.trim() === "" || password.trim() === "") {
            throw new ApiError(400, "Some fields are missing");
        }

        // checking the email pattern
        if (!EMAIL_REGEX.test(email)) {
            throw new ApiError(400, "Email is not in currect format");
        }

        // retrieving data of exsiting user
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                full_name: true,
                email: true,
                avater: true,
                role: true,
            },
        });

        // throw error if user dose not exist
        if (!user) {
            throw new ApiError(401, "Invalid email address!");
        }

        // generate refresh and access tokens
        const { accessToken, refreshToken } = getAccessAndRefreshToken(user);

        // update the user with the newly generated refresh token
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                refreshToken,
            },
            select: {
                refreshToken: true,
            },
        });

        // throw error if there is any problem occur during the updation time
        if (!updatedUser.refreshToken) {
            throw new ApiError(500, "Can't update refresh token in database");
        }

        // setting the cookie options
        const options: CookieOptions = {
            httpOnly: true,
            secure: true,
        };

        // response the final result if signIn process successful
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, "Authentication successful!", {
                    fullName: user.full_name,
                    role: user.role,
                    avater: user.avater,
                })
            );
    }
);

// ------------------SignOut logic defined------------------
const signOutUser = asyncHandler(
    async (req: TypedRequest<any>, res: Response) => {
        const updatedUser = prisma.user.update({
            where: {
                id: req.user?.id,
            },
            data: {
                refreshToken: null,
            },
            select: {
                id: true,
            },
        });

        if (!updatedUser) {
            throw new ApiError(
                500,
                "Something went wrong can't delete token from database"
            );
        }

        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
        };

        res.status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json(new ApiResponse(200, "User signed out successfully", null));
    }
);

export { registerUser, signInUser, signOutUser };
