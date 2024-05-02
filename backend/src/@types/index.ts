import {Request} from 'express'

export type ValidateUserType = {
    email: string;
    password: string;
};

export enum Role {
    USER,
    ADMIN
}

export type AccessTokenUserType = {
    id: string
    full_name: string
    email: string
    role: Role
}

export type RequestBodyUser = {
    fname: string,
    lname: string,
    email: string,
    password: string,
    confirm_password: string
    role: Role
    avater?: string
}

export interface TypedRequest<T> extends Request {
    body: RequestBodyUser,
    files: FileList
}