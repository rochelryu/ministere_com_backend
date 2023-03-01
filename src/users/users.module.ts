import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ALL_ENTITY } from 'src/common/constant';

@Module({
  imports: ALL_ENTITY,
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
