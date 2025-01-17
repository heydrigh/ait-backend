import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('AITS_SERVICE') private readonly client: ClientProxy) {}

  async sendStream(queueName: string, csvData: string): Promise<void> {
    this.client.emit(queueName, { csv: csvData });
  }
}
