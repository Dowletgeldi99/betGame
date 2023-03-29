import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {JwtPayload} from '../interfaces/jwt-payload.interface';
import {AuthService} from '../auth.service';
import {AppConfigService} from '../../../config/app/config.service';
import {UserEntity} from '../../../common/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        appConfigService: AppConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            passReqToCallback: false,
            secretOrKey: appConfigService.jwtSecret,
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        return this.authService.verifyPayload(payload);
    }
}
