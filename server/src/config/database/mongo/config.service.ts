import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get connectionUrl(): string {
    return this.configService.get<string>('mongo.connectionUrl');
  }
}
