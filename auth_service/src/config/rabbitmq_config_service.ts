import * as dotenv from 'dotenv';
dotenv.config();

declare let process: {
    env: {
      RMQ_URL: string;
      RMQ_QUEUE: string;
    };
  };

export default function(): any {
    return {
        urls: [process.env.RMQ_URL],
        queue: process.env.RMQ_QUEUE,
        queueOptions: {
        durable: false,
        },
    }
}