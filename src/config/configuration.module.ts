import { Module } from '@nestjs/common';
import { ConfigurationService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ait } from 'src/aits/entities/ait.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ait])],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
