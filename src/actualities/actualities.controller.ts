import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ActualitiesService } from './actualities.service';
import { CreateActualityDto } from './dto/create-actuality.dto';
import { UpdateActualityDto } from './dto/update-actuality.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseProviderClass } from 'src/common/ResponseProvider';
import { getInfoInAip } from 'src/common/functions';

@ApiTags('Actualities')
@Controller('actualities')
export class ActualitiesController {
  constructor(private readonly actualitiesService: ActualitiesService) {}

  @Post()
  create(@Body() createActualityDto: CreateActualityDto) {
    return this.actualitiesService.create(createActualityDto);
  }

  @ApiOkResponse({
    status: 200,
    description:
      'return all Actualities by Limit {etat:true, result: []} if success and {etat: false, error: "error message"} if fail',
    type: ResponseProviderClass,
  })
  @Get('all/:id')
  async findAll(
    @Param('id') id: string,
    @Query('limit') limit: string,
    @Query('recovery') recovery: string,
  ) {
    return await this.actualitiesService.findTheLatestNewsByLimit(
      {},
      parseInt(limit, 10),
    );
  }

  @ApiOkResponse({
    status: 200,
    description:
      'return all Actualities in Search Advanced {etat:true, result: []} if success and {etat: false, error: "error message"} if fail',
    type: ResponseProviderClass,
  })
  @Get('search/:id')
  async search(
    @Param('id') id: string,
    @Query('searchText') searchText: string,
    @Query('recovery') recovery: string,
  ) {
    return await getInfoInAip(searchText.trim());
  }

  @ApiOkResponse({
    status: 200,
    description:
      'return all Actualities By Limit and Hobby {etat:true, result: []} if success and {etat: false, error: "error message"} if fail',
    type: ResponseProviderClass,
  })
  @Get('getByHobby/:id/:hobbyId')
  async getByHobby(
    @Param('id') id: string,
    @Param('hobbyId') hobbyId: string,
    @Query('limit') limit: string,
    @Query('recovery') recovery: string,
  ) {
    const allActuality: any[] = [];
    const getAllLiaisonActualityHobby =
      await this.actualitiesService.findAllLiaisonActualityHobbyEntityByItem({
        hobbyId: parseInt(hobbyId, 10),
      });
    const allLiaisons =
      getAllLiaisonActualityHobby.result.length >= parseInt(limit, 10)
        ? getAllLiaisonActualityHobby.result.slice(0, limit)
        : getAllLiaisonActualityHobby.result;
    for (const liaisonActualityHobby of allLiaisons) {
      console.log(liaisonActualityHobby.id);
      const getActuality = await this.actualitiesService.findOneByItem({
        id: liaisonActualityHobby.id,
      });
      allActuality.push(getActuality.result);
    }
    return { etat: true, result: allActuality };
  }

  @ApiOkResponse({
    status: 200,
    description:
      'return detail Actuality {etat:true, result: {}} if success and {etat: false, error: "error message"} if fail',
    type: ResponseProviderClass,
  })
  @Get('viewMore/:id/:actualityId')
  async viewMore(
    @Param('id') id: string,
    @Param('actualityId') actualityId: string,
    @Query('recovery') recovery: string,
  ) {
    return await this.actualitiesService.findOneByItem({
      id: parseInt(actualityId, 10),
    });
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
