import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  ResponseAuthenticationUser,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SigninUserDto } from './dto/signin-user.dto';
import { HobbiesService } from 'src/hobbies/hobbies.service';
import { UpdateHobbyUserDto } from 'src/hobbies/dto/update-hobby.dto';
import { generateRecovery } from 'src/common/functions';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hobbiesService: HobbiesService,
  ) {}

  @ApiOkResponse({
    status: 200,
    description:
      'create User return {etat:true, result: {name, id, numberClient, recovery}} if success and {etat: false, error: "error message"}',
    type: ResponseAuthenticationUser,
  })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    if (newUser.etat) {
      return newUser;
    } else {
      return { etat: false, error: newUser.error.message };
    }
  }

  @ApiTags('Hobbies')
  @ApiOkResponse({
    status: 200,
    description:
      'update hobbies of User return {etat:true, result: {recovery}} if success and {etat: false, error: "error message"}',
    type: ResponseAuthenticationUser,
  })
  @Post('updateHobbies')
  async updateHobbies(@Body() updateHobbyUserDto: UpdateHobbyUserDto) {
    for (const choice of updateHobbyUserDto.choiceHobbie) {
      await this.hobbiesService.createLiaisonHobbiesUser(
        updateHobbyUserDto.id,
        choice,
      );
    }
    const recoveryNewUser = generateRecovery();
    const updateRecovery = await this.usersService.updateUserByItem(
      updateHobbyUserDto.id,
      { recovery: recoveryNewUser },
    );
    return { etat: true, result: updateRecovery.result };
  }

  @ApiOkResponse({
    status: 200,
    description:
      'authentication User return {etat:true, result: {name, id, numberClient}} if success and {etat: false, error: "error message"}',
    type: ResponseAuthenticationUser,
  })
  @Post('signin')
  async signin(@Body() signinUserDto: SigninUserDto) {
    const client = await this.usersService.verifyUser(signinUserDto);
    if (client.etat) {
      return client;
    } else {
      return { etat: false, error: client.error.message };
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
