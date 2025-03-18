import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptionsFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientsModuleConfigService implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createClientOptions(): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.configService.get('urls'),
        queue: this.configService.get('queue'),
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  createClientOptionsByName(name: string): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.configService.get('RABBITMQ_URL_' + name),
        queue: this.configService.get('RABBITMQ_QUEUE_' + name),
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
