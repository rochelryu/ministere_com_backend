import { Module } from '@nestjs/common';
import { ActualitiesService } from './actualities.service';
import { ActualitiesController } from './actualities.controller';

@Module({
  controllers: [ActualitiesController],
  providers: [ActualitiesService]
})
export class ActualitiesModule {}
