import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {UserEntity} from '../../common/entities/user.entity';
import {UsersService} from '../users/users.service';
import {SignUpDto} from './dto/signUp.dto';
import {AppConfigService} from '../../config/app/config.service';

@Injectable()
export class AuthService {
    constructor(
        private appConfigService: AppConfigService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async register(body: SignUpDto): Promise<any> {
        return await this.usersService.create(body.name);
    }

    async verifyPayload(payload: JwtPayload): Promise<UserEntity> {
        let user: UserEntity;

        try {
            user = await this.usersService.getUserByName(payload.sub);
        } catch (error) {
            throw new UnauthorizedException(
                `There isn't any user with name: ${payload.sub}`,
            );
        }

        return user;
    }

    async verify(token: string) {
        const payload = this.jwtService.verify(token, {
            ignoreExpiration: false,
            secret: this.appConfigService.jwtSecret,
        });

        console.log({payload});

        return payload;
    }

    signToken(username: string): string {
        const payload = {
            sub: username,
        };
        return this.jwtService.sign(payload);
    }
}
