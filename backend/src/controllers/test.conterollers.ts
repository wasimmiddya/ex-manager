import { Request, Response } from "express";

export const testApi = (req: Request, res: Response) => {
    console.log(req.headers);
    return res.status(200).json(
        {
            success: true,
            message: "API testing successfull, all the routes and controllers are working absolutely fine!!!"
        }
    )
}




