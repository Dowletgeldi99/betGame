import {IUser} from "./User";

export interface ISignUpPayload {
    name: string
}


export interface IServerError<T = Record<string, unknown>> {
    code: string;
    message?: string;
    data: T;
}

export interface IAuth {
    token: string
    data: IUser
}