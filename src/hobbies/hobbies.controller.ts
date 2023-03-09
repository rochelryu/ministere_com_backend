import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { UpdateHobbyUserDto } from './dto/update-hobby.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseProviderClass } from 'src/common/ResponseProvider';

@ApiTags('Hobbies')
@Controller('hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  // @Post('choice')
  // create(@Body() createHobbyDto: UpdateHobbyUserDto) {
  //   return this.hobbiesService.create(createHobbyDto);
  // }

  @ApiOkResponse({
    status: 200,
    description:
      'return all Hobbies {etat:true, result: [{id:number, name:string,picture:string}]} if success and {etat: false, error: "error message"} if fail',
    type: ResponseProviderClass,
  })
  @Get('all/:id')
  findAll() {
    return this.hobbiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hobbiesService.findOneByItem({ id: parseInt(id, 10) });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbiesService.remove(+id);
  }
}
