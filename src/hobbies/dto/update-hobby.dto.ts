import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';
import { UserSchemeDto } from 'src/users/dto/user-scheme';

export class UpdateHobbyUserDto extends PartialType(UserSchemeDto) {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    name: 'choiceHobbie',
    description: 'array contain id of choice hobbie of User',
  })
  readonly choiceHobbie: number[];
}
