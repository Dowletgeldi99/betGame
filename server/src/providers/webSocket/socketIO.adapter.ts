import {INestApplicationContext, Logger} from '@nestjs/common';
import {IoAdapter} from '@nestjs/platform-socket.io';
import {Server, ServerOptions} from 'socket.io';
import {JwtService} from '@nestjs/jwt';
import {SocketWithAuth} from '../../common/types/socket.types';
import {AppConfigService} from "../../config/app/config.service";

export class SocketIOAdapter extends IoAdapter {
    private readonly logger = new Logger(SocketIOAdapter.name);

    constructor(
        private app: INestApplicationContext,
        private appConfigService: AppConfigService,
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const clientPort = this.appConfigService.clientPort || 5173
        const cors = {
            origin: [
                `http://localhost:${clientPort}`,
                new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
            ],
        };

        this.logger.log('Configuring SocketIO server with custom CORS options', {
            cors,
        });

        const optionsWithCORS: ServerOptions = {
            ...options,
            cors,
        };

        const jwtService = this.app.get(JwtService);
        const server: Server = super.createIOServer(port, optionsWithCORS);

        server.of('game').use(createTokenMiddleware(jwtService, this.logger));

        return server;
    }
}

const createTokenMiddleware =
    (jwtService: JwtService, logger: Logger) =>
        (socket: SocketWithAuth, next) => {
            const token =
                socket.handshake.auth.token || socket.handshake.headers['token'];

            logger.debug(`Validating auth token before connection: ${token}`);

            try {
                const payload = jwtService.verify(token);
                socket.name = payload.sub;
                next();
            } catch {
                next(new Error('FORBIDDEN'));
            }
        };
