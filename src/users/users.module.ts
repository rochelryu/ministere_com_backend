import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ALL_ENTITY } from 'src/common/constant';
import { HobbiesService } from 'src/hobbies/hobbies.service';

@Module({
  imports: ALL_ENTITY,
  controllers: [UsersController],
  providers: [UsersService, HobbiesService],
})
export class UsersModule {}
