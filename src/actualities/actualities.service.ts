import { Injectable } from '@nestjs/common';
import { CreateActualityDto } from './dto/create-actuality.dto';
import { UpdateActualityDto } from './dto/update-actuality.dto';

@Injectable()
export class ActualitiesService {
  create(createActualityDto: CreateActualityDto) {
    return 'This action adds a new actuality';
  }

  findAll() {
    return `This action returns all actualities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actuality`;
  }

  update(id: number, updateActualityDto: UpdateActualityDto) {
    return `This action updates a #${id} actuality`;
  }

  remove(id: number) {
    return `This action removes a #${id} actuality`;
  }
}
