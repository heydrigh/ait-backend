import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, connect, Message } from 'amqplib';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channel: Channel;

  async onModuleInit(): Promise<void> {
    await this.connectToRabbitMQ();
    await this.startConsuming();
  }

  private async connectToRabbitMQ(): Promise<void> {
    const connection = await connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('aits_queue', {
      durable: true,
    });
    console.log('Connected to RabbitMQ and listening to queue: aits_queue');

    await this.channel.prefetch(100);
  }

  private async startConsuming(): Promise<void> {
    await this.channel.consume(
      'aits_queue',
      (msg: Message | null) => {
        if (msg) {
          const csvRow = msg.content.toString();
          console.log('--- New Message ---');
          console.log(csvRow);
          console.log('-------------------');
          this.channel.ack(msg);
        }
      },
      { noAck: false },
    );
  }
}
