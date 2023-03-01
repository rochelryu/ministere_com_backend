import { LiaisonActualityHobbyEntity } from 'src/actualities/entities/actuality.entity';
import { LiaisonUserHobbyEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class HobbyEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(
    () => LiaisonActualityHobbyEntity,
    (liaisonActualityHobbyEntity) => liaisonActualityHobbyEntity.hobbyId,
  )
  liaisonActualityHobbies: LiaisonActualityHobbyEntity[];

  @OneToMany(
    () => LiaisonUserHobbyEntity,
    (liaisonActualityHobby) => liaisonActualityHobby.hobbyId,
  )
  liaisonUserHobbies: LiaisonUserHobbyEntity[];
}
