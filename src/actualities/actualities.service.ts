import { Injectable } from '@nestjs/common';
import { CreateActualityDto } from './dto/create-actuality.dto';
import { UpdateActualityDto } from './dto/update-actuality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ActualityEntity,
  LiaisonActualityHobbyEntity,
} from './entities/actuality.entity';
import { Repository } from 'typeorm';
import { ResponseProvider } from 'src/common/interfaces';

@Injectable()
export class ActualitiesService {
  constructor(
    @InjectRepository(ActualityEntity)
    private actualityRepository: Repository<ActualityEntity>,
    @InjectRepository(LiaisonActualityHobbyEntity)
    private liaisonActualityHobbyEntityRepository: Repository<LiaisonActualityHobbyEntity>,
  ) {}

  create(createActualityDto: CreateActualityDto) {
    return 'This action adds a new actuality';
  }

  findTheLatestNewsByLimit(
    item: any,
    limit: number,
  ): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.actualityRepository
        .find({ where: item, order: { create_at: 'DESC' } })
        .then((result) => {
          result = result.slice(0, limit);
          next({ etat: true, result });
        })
        .catch((error) => next({ etat: false, error: error.message }));
    });
  }

  findOneByItem(item): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.actualityRepository
        .findOne({ where: item })
        .then((result) => {
          next({ etat: true, result });
        })
        .catch((error) => next({ etat: false, error: error.message }));
    });
  }

  update(id: number, updateActualityDto: UpdateActualityDto) {
    return `This action updates a #${id} actuality`;
  }

  remove(id: number) {
    return `This action removes a #${id} actuality`;
  }

  findAllLiaisonActualityHobbyEntityByItem(
    item: any,
  ): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.liaisonActualityHobbyEntityRepository
        .find({ where: item })
        .then((result) => {
          next({ etat: true, result });
        })
        .catch((error) => next({ etat: false, error: error.message }));
    });
  }

  findOneLiaisonActualityHobbyEntityByItem(
    item: any,
  ): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.liaisonActualityHobbyEntityRepository
        .find({ where: item })
        .then((result) => {
          next({ etat: true, result });
        })
        .catch((error) => next({ etat: false, error: error.message }));
    });
  }
}
