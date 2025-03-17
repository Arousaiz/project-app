import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

declare let process: {
  env: {
    RMQ_URL: string;
    RMQ_QUEUE: string;
  };
};

async function bootstrap() {
  const urls = process.env.RMQ_URL;
  const queue = process.env.RMQ_QUEUE;
  const options = {
    urls: [urls],
    queue: queue,
    queueOptions: {
      durable: false,
    },
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: options,
    },
  );
  await app.listen();
}
bootstrap();
