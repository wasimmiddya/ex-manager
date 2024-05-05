import { Request, Response } from "express";

export const testApi = async (req: Request, res: Response) => {


    // const user = await prisma.user.create({
    //     data: {
    //         fname: "John",
    //         lname: "Doe",
    //         email: "johndoe2000@gmail.com",
    //         password: "12345",
    //         avater: "",
    //         role: "ADMIN",
    //     },
    // });

    // const isValidPassword = await prisma.user.isValidPassword({email: "johndoe2000@gmail.com", password: "12345"})


    return res.status(200).json({
        success: true,
        message:
            "API testing successfull, all the routes and controllers are working absolutely fine!!!",
        data: {},
    });
};
