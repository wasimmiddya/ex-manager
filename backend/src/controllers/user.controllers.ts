import { Response, NextFunction } from "express";
import { asyncHandler } from "../utils/async_handler";
import { RequestBodyUser, TypedRequest } from "../@types";
import ApiError from "../utils/api_err.utils";


// ---------------Controller for handling user registration-----------------
const registerUser = asyncHandler(
    async (req: TypedRequest<RequestBodyUser>,res: Response,next: NextFunction) => {
        // checking if all the fields are filled up or not
        const {fname, lname, email, password, confirm_password} = req.body

        if ([fname,lname,email,password,confirm_password].some(elem => elem.trim() === "")) {
            throw new ApiError(401, "Some fields are missing...");
        }
    }
);
