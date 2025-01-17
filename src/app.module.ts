import { Module } from '@nestjs/common';
import { AitsModule } from './aits/aits.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationService } from './config/config.service';
import { ProducerModule } from './producer/producer.module';
// import { ConsumerService } from './consumer/consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfig()),
    AitsModule,
    ProducerModule,
  ],
  controllers: [],
  providers: [],
  // providers: [ConsumerService], REPLACE THIS WHEN TESTING THE CONSUMPTION OF THE QUEUE
})
export class AppModule {}
