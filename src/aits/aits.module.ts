import { Module } from '@nestjs/common';
import { AitController } from './aits.controller';
import { AitService } from './aits.service';
import { Ait } from './entities/ait.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ait])],
  controllers: [AitController],
  providers: [AitService],
})
export class AitsModule {}
