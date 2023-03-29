import {Socket} from 'socket.io';
import {Request} from 'express';

export type AuthPayload = {
    // userID: Types.ObjectId;
    totalPoint: number
    name: string;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
