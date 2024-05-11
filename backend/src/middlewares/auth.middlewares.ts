import { Response, NextFunction } from "express";
import { asyncHandler } from "../utils/async_handler";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma-client";
import { ApiError } from "../utils/api_err.utils";
import { TypedRequest } from "../@types";

const verifyJWT = asyncHandler(
    async (req: TypedRequest<any>, _: Response, next: NextFunction) => {
        try {
            // getting the token from the request
            const token =
                req.cookies?.accessToken ||
                req.header("Authorization")?.replace("Bearar ", "");

            // console.log({token});
            

            if (!token) {
                throw new ApiError(401, "Unauthorized request");
            }

            // decode the accesss token
            const decodedToken: any = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            );

            // console.log({ decodedToken });

            // verify the user id
            const user = await prisma.user.findUnique({
                where: { id: decodedToken?.id },
                select: {
                    id: true,
                    email: true,
                    role: true
                },
            });

            if (!user) {
                throw new ApiError(401, "Invalid access token!!!");
            }

            req.user = user;
            next();
        } catch (error: any) {
            throw new ApiError(401, error.message);
        }
    }
);

export { verifyJWT };
