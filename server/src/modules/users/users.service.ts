import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersRepository} from './users.repository';
import {UserEntity} from '../../common/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {
    }

    async getUserByName(name: string): Promise<UserEntity> {
        return await this.usersRepository.getOneUserByFilter({name});
    }

    async create(name: string) {
        const userExist = await this.usersRepository.getOneUserByFilter({
            name,
        });
        if (userExist)
            throw new HttpException('user exist', HttpStatus.BAD_REQUEST);

        return await this.usersRepository.createNewUser(name);
    }
}
