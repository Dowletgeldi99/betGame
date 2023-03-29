import {Types} from 'mongoose';

export class UserEntity {
    _id?: Types.ObjectId;
    ws_id?: string;
    name: string;
}
