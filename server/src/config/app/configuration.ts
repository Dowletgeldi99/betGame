import {registerAs} from '@nestjs/config';

export default registerAs('app', () => ({
    url: process.env.APP_URL,
    port: process.env.PORT,
    clientPort: process.env.CLIENT_PORT,
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
}));
