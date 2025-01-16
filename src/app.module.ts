import { Module } from '@nestjs/common';
import { AitsModule } from './aits/aits.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfig()),
    AitsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
