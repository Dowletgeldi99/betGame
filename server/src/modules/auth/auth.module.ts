import {JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {AppConfigModule} from '../../config/app/config.module';
import {AppConfigService} from '../../config/app/config.service';
import {UsersModule} from '../users/users.module';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {AuthController} from './auth.controller';

@Module({
    imports: [
        AppConfigModule,
        UsersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: async (appConfigService: AppConfigService) => {
                return {
                    secret: appConfigService.jwtSecret,
                    signOptions: {
                        expiresIn: appConfigService.jwtExpirationTime,
                        algorithm: 'HS384',
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
