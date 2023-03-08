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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    status: 200,
    description:
      'create User return {etat:true, result: {name, id, numberClient}} if success and {etat: false, error: "error message"}',
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
