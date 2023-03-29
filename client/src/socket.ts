import {io, Socket} from 'socket.io-client';
import {ClientToServerEvents, ServerToClientEvents} from "./types/Socket";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('');