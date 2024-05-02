import { Request, Response, NextFunction } from "express";

// for handling the exception and error 
export const asyncHandler = function (cb: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(cb(req, res, next)).catch((err) => next(err));
    };
};
