import { Injectable } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HobbyEntity } from './entities/hobby.entity';
import { ResponseProvider } from 'src/common/interfaces';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectRepository(HobbyEntity)
    private hobbiesRepository: Repository<HobbyEntity>,
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

  findOne(id: number) {
    return `This action returns a #${id} hobby`;
  }

  update(id: number, updateHobbyDto: UpdateHobbyDto) {
    return `This action updates a #${id} hobby`;
  }

  remove(id: number) {
    return `This action removes a #${id} hobby`;
  }
}
