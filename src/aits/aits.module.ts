import { Module } from '@nestjs/common';
import { AitController } from './aits.controller';
import { AitService } from './aits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ait } from './entities/ait.entity';
import { ProducerModule } from 'src/producer/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ait]), ProducerModule],
  controllers: [AitController],
  providers: [AitService],
})
export class AitsModule {}
