import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SALT } from "./../src/constants";
import jwt from "jsonwebtoken";
import { ApiError } from "../src/utils/api_err.utils";



const prisma = new PrismaClient().$extends({
    // --------------------define extensions for database queries------------------------
    query: {
        user: {
            async create({ model, args, operation, query }) {
                // generating the full name by concatinating first name and last name
                args.data.full_name = args.data.fname + " " + args.data.lname;

                // hash the password befor storing it to the database
                args.data.password = await bcrypt.hash(
                    args.data.password,
                    SALT
                );

                return query(args);
            },
        },
    },

    // ----------------------------define extensions for models----------------------------
    model: {
        user: {
            /**
             * utility method for validating the password of existed user
             * @deprecated
             * @param this 
             * @param plainPassword 
             * @param where 
             * @returns boolean
             */
            async isValidPassword<T>(
                this: T,
                plainPassword: string,
                where: Prisma.Args<T, "findUnique">["where"]
            ): Promise<boolean> {
                const context = Prisma.getExtensionContext(this);

                try {
                    const user = (context as any).findUnique({
                        where,
                        select: { password: true },
                    });

                    return await bcrypt.compare(plainPassword, user.password);
                } catch (error) {
                    throw new ApiError(400, "Something went wrong")
                }
            },

            /**
             * This method will generate the access token and return a long encoded string value
             * @deprecated
             * @param this
             * @param where
             * @returns String
             */
            async generateAccessToken<T>(
                this: T,
                where: Prisma.Args<T, "findUnique">["where"]
            ): Promise<string> {
                const context = Prisma.getExtensionContext(this);

                const user = await (context as any).findUnique({
                    where,
                    select: {
                        full_name: true,
                        email: true,
                        role: true,
                        id: true,
                    },
                });

                const accessToken = jwt.sign(
                    user,
                    process.env.ACCESS_TOKEN_SECRET as string,
                    {
                        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
                    }
                );

                return accessToken;
            },

            /**
             * This method will generate the refresh token and return a long encoded string value
             * @deprecated 
             * @param this
             * @param where
             * @returns String
             */
            async generateRefreshToken<T>(
                this: T,
                where: Prisma.Args<T, "findUnique">["where"]
            ): Promise<string> {
                const context = Prisma.getExtensionContext(this);

                const user = await (context as any).findUnique({
                    where,
                    select: { id: true },
                });

                const refreshToken = jwt.sign(
                    user,
                    process.env.REFRESH_TOKE_SECRET as string,
                    {
                        expiresIn: process.env.REFRESH_TOKE_EXPIRY,
                    }
                );

                return refreshToken;
            },
        },
    },
});

export default prisma;
