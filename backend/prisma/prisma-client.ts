import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SALT } from "./../src/constants";
import { ValidateUserType } from "./../src/@types/index";
import jwt from "jsonwebtoken";

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
            // utility method for validating the password of existed user
            async isValidPassword({
                email,
                password,
            }: ValidateUserType): Promise<boolean> {
                // quering the database to fetch the existed user (i.e only password field)
                const existedUser: { password: string } | null =
                    await prisma.user.findUnique({
                        where: {
                            email: email,
                        },
                        select: {
                            password: true,
                        },
                    });

                // handler logic if the user does not exist on the database
                if (!existedUser) {
                    throw new Error("Wrong credentials");
                }

                return await bcrypt.compare(password, existedUser.password);
            },

            /**
             * This method will generate the access token and return a long encoded string value
             * ```js
             * // internal token implementation
             * jwt.sign({
             *      {
             *          id: user.id
             *          full_name: user.full_name
             *          email: user.email
             *          role: user.role
             *      },
             *      secret: process.env.REFRESH_TOKEN_SECRET,
             *      {
             *          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
             *      }
             * });
             * ```
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
             * ```js
             * // internal token implementation
             * jwt.sign({
             *      {
             *          id: user.id
             *      },
             *      secret: process.env.REFRESH_TOKEN_SECRET,
             *      {
             *          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
             *      }
             * });
             * ```
             * @param this
             * @param where
             * @returns String
             */
            async generateRefreshToken<T>(
                this: T,
                where: Prisma.Args<T, "findUnique">["where"]
            ): Promise<string> {
                const context = Prisma.getExtensionContext(this);

                const user = (context as any).findUnique({
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