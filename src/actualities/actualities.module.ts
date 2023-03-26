import { Module } from '@nestjs/common';
import { ActualitiesService } from './actualities.service';
import { ActualitiesController } from './actualities.controller';
import { ALL_ENTITY } from 'src/common/constant';

@Module({
  imports: ALL_ENTITY,
  controllers: [ActualitiesController],
  providers: [ActualitiesService],
})
export class ActualitiesModule {}
