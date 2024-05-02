import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SALT } from "./../src/constants";
import { ValidateUserType } from "./../src/@types/index";

const prisma = new PrismaClient().$extends({
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
        },
    },
});

export default prisma;
