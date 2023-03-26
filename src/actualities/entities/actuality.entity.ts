import { HobbyEntity } from 'src/hobbies/entities/hobby.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class ActualityEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  title: string;

  @Column()
  sub_title: string;

  @Column({ type: 'longtext' })
  summary: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'boolean' })
  isPortrait: boolean;

  @Column()
  imageCover: string;

  @Column({ type: 'int', default: 0 })
  numberVue: number;

  @Column({ type: 'int', default: 0 })
  popularity: number; //0 for Simple, 1 for Top Actu

  @CreateDateColumn() create_at: Date;

  // Relationship
  @OneToMany(() => ContentActualityEntity, (content) => content.actualityId)
  contents: ContentActualityEntity[];

  @OneToMany(
    () => CommentActualityUserEntity,
    (comments) => comments.actualityId,
  )
  comments: CommentActualityUserEntity[];

  @OneToMany(
    () => LiaisonActualityHobbyEntity,
    (liaisonActualityHobby) => liaisonActualityHobby.actualityId,
  )
  liaisonActualityHobbies: LiaisonActualityHobbyEntity[];
}

@Entity()
export class ContentActualityEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' })
  actualityId: number;

  @Column({ default: '' })
  file: string;

  @Column({ type: 'boolean' })
  isPortrait: boolean;

  @Column({ default: 'picture' })
  type: string;

  @OneToOne(() => ActualityEntity, (actuality) => actuality.contents)
  @JoinColumn({ name: 'actualityId' })
  actuality: ActualityEntity;
}

@Entity()
export class LiaisonActualityHobbyEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' })
  actualityId: number;

  @Column({ type: 'int' })
  hobbyId: number;

  @ManyToOne(
    () => ActualityEntity,
    (actuality) => actuality.liaisonActualityHobbies,
  )
  @JoinColumn({ name: 'actualityId' })
  actuality: ActualityEntity;

  @ManyToOne(() => HobbyEntity, (hobby) => hobby.liaisonActualityHobbies)
  @JoinColumn({ name: 'hobbyId' })
  hobby: HobbyEntity;
}

@Entity()
export class CommentActualityUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'int' })
  actualityId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column()
  content: string;

  @CreateDateColumn() create_at: Date;

  @ManyToOne(() => ActualityEntity, (actuality) => actuality.comments)
  @JoinColumn({ name: 'actualityId' })
  actuality: ActualityEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  hobby: UserEntity;
}
