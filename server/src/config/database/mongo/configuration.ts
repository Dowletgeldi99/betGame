import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  connectionUrl: process.env.MONGO_URL,
}));
