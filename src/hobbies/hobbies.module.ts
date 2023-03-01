import { Module } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbiesController } from './hobbies.controller';
import { ALL_ENTITY } from 'src/common/constant';

@Module({
  imports: ALL_ENTITY,
  controllers: [HobbiesController],
  providers: [HobbiesService],
})
export class HobbiesModule {}
