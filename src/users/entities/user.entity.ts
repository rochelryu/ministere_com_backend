import { CommentActualityUserEntity } from 'src/actualities/entities/actuality.entity';
import { HobbyEntity } from 'src/hobbies/entities/hobby.entity';
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
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 50 })
  numberClient: string;

  @Column({ length: 50, default: '' })
  email: string;

  @Column({ type: 'int' })
  recovery: number;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn() create_at: Date;

  @Column() updated_at: Date;

  //Relationship
  @OneToMany(
    () => LiaisonUserHobbyEntity,
    (liaisonActualityHobby) => liaisonActualityHobby.userId,
  )
  liaisonUserHobbies: LiaisonUserHobbyEntity[];

  @OneToMany(() => CommentActualityUserEntity, (comments) => comments.userId)
  comments: CommentActualityUserEntity[];
}

@Entity()
export class LiaisonUserHobbyEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  hobbyId: number;

  @ManyToOne(() => UserEntity, (user) => user.liaisonUserHobbies)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => HobbyEntity, (hobby) => hobby.liaisonUserHobbies)
  @JoinColumn({ name: 'hobbyId' })
  hobby: HobbyEntity;
}
