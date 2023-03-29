import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../../providers/db/models/user.model';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async getOneUserByFilter(filter: object): Promise<User> {
        return await this.userModel.findOne(filter).exec();
    }

    async createNewUser(name: string): Promise<User> {
        return await this.userModel.create({name});
    }
}
