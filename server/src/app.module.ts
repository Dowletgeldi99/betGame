import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './providers/webSocket/webSocket.gateway';
import { AppConfigModule } from './config/app/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongoDBModule } from './providers/db/database.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AppConfigModule, MongoDBModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
