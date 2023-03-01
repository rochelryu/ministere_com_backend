import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ActualityEntity,
  CommentActualityUserEntity,
  ContentActualityEntity,
  LiaisonActualityHobbyEntity,
} from 'src/actualities/entities/actuality.entity';
import { HobbyEntity } from 'src/hobbies/entities/hobby.entity';
import {
  LiaisonUserHobbyEntity,
  UserEntity,
} from 'src/users/entities/user.entity';

export const ALL_ENTITY = [
  TypeOrmModule.forFeature([UserEntity]),
  TypeOrmModule.forFeature([HobbyEntity]),
  TypeOrmModule.forFeature([ActualityEntity]),
  TypeOrmModule.forFeature([ContentActualityEntity]),
  TypeOrmModule.forFeature([LiaisonActualityHobbyEntity]),
  TypeOrmModule.forFeature([LiaisonUserHobbyEntity]),
  TypeOrmModule.forFeature([CommentActualityUserEntity]),
];
