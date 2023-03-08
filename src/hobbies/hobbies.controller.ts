import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseProviderClass } from 'src/common/ResponseProvider';

@ApiTags('Hobbies')
@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
  create(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbiesService.create(createHobbyDto);
  }

  @ApiOkResponse({
    status: 200,
    description:
      'create User return {etat:true, result: Object} if success and {etat: false, error: "error message"}',
    type: ResponseProviderClass,
  })
  @Get('all/:id')
  findAll() {
    return this.hobbiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbiesService.update(+id, updateHobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbiesService.remove(+id);
  }
}
