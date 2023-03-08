import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActualitiesService } from './actualities.service';
import { CreateActualityDto } from './dto/create-actuality.dto';
import { UpdateActualityDto } from './dto/update-actuality.dto';

@Controller('actualities')
export class ActualitiesController {
  constructor(private readonly actualitiesService: ActualitiesService) {}

  @Post()
  create(@Body() createActualityDto: CreateActualityDto) {
    return this.actualitiesService.create(createActualityDto);
  }

  @Get()
  findAll() {
    return this.actualitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actualitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActualityDto: UpdateActualityDto,
  ) {
    return this.actualitiesService.update(+id, updateActualityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actualitiesService.remove(+id);
  }
}
