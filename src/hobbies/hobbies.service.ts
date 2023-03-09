import { Injectable } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HobbyEntity } from './entities/hobby.entity';
import { ResponseProvider } from 'src/common/interfaces';
import { LiaisonUserHobbyEntity } from 'src/users/entities/user.entity';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectRepository(HobbyEntity)
    private hobbiesRepository: Repository<HobbyEntity>,

    @InjectRepository(LiaisonUserHobbyEntity)
    private liaisonUserHobbyRepository: Repository<LiaisonUserHobbyEntity>,
  ) {}

  create(createHobbyDto: CreateHobbyDto) {
    return 'This action adds a new hobby';
  }

  findAll(): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.hobbiesRepository
        .find({ where: {} })
        .then((result) => {
          next({ etat: true, result });
        })
        .catch((error) => next({ etat: false, error: error.message }));
    });
  }

  findOneByItem(item) {
    return new Promise(async (next) => {
      await this.hobbiesRepository
        .findOne({ where: item })
        .then((result) => {
          next({ etat: true, result });
        })
        .catch((error) => next({ etat: false, error: error.message }));
    });
  }

  remove(id: number) {
    return `This action removes a #${id} hobby`;
  }

  // For Liaison Hobbies User
  async createLiaisonHobbiesUser(
    userId: number,
    hobbyId: number,
  ): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.liaisonUserHobbyRepository
        .save({ userId, hobbyId })
        .then((result) => {
          next({ etat: true, result });
        })
        .catch((error) => {
          next({ etat: false, error });
        });
    });
  }
}
