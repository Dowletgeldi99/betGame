import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SocketIOAdapter} from './providers/webSocket/socketIO.adapter';
import {AppConfigService} from './config/app/config.service';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig: AppConfigService = app.get(AppConfigService);
    app.use(cookieParser(appConfig.jwtSecret));
    app.enableCors({
        origin: '*',
        credentials: true,
        exposedHeaders: ['Authorization'],
    });
    app.useWebSocketAdapter(new SocketIOAdapter(app, appConfig));
    const port = 3000;
    await app
        .listen(port, '0.0.0.0')
        .then(() =>
            console.log(`Application is running on: http://localhost:${port}`),
        );
}

bootstrap();
