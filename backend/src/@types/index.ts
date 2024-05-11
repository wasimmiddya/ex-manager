import { Role } from "@prisma/client";
import { UploadApiResponse } from "cloudinary";
import { Request } from "express";

export type ValidateUserType = {
    email: string;
    password: string;
};

export enum UserRole {
    USER,
    ADMIN,
}

export type TokenUserType = {
    id: string;
    full_name: string | null;
    email: string;
    role: Role;
    avater: string;
};

export type RequestBodyUser = {
    fname: string;
    lname: string;
    email: string;
    password: string;
    mobile: string;
    role: UserRole;
    avater?: string | UploadApiResponse;
};

export type RequestDataBody = {
    expenditure: string;
    amountClaimed: number;
    receipt?: string;
}

export interface TypedRequest<T> extends Request {
    body: T;
    files: {
        avater: [any];
        receiptFiles: [any]
    };
    user: {
        id: string;
        email: string;
        role: Role;
    } | null;
}
