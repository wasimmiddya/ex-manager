import { UploadApiResponse } from 'cloudinary';
import {Request} from 'express'

export type ValidateUserType = {
    email: string;
    password: string;
};

export enum UserRole {
    USER,
    ADMIN
}

export type AccessTokenUserType = {
    id: string
    full_name: string
    email: string
    role: UserRole
}

export type RequestBodyUser = {
    fname: string,
    lname: string,
    email: string,
    password: string,
    confirm_password: string
    role: UserRole
    avater?: string | UploadApiResponse
}

export interface TypedRequest<T> extends Request {
    body: T,
    files: any
}