import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {TransformationInterceptor} from './interceptors/transform.interceptor';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {SignUpDto} from './dto/signUp.dto';
import {JwtAuthGuard} from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @Post('/register')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TokenInterceptor, TransformationInterceptor)
    async register(@Body() body: SignUpDto): Promise<any> {
        return this.authService.register(body);
    }

    @Get('/me')
    @UseInterceptors(TransformationInterceptor)
    @UseGuards(JwtAuthGuard)
    async me(@Req() req) {
        return req.user;
    }
}
