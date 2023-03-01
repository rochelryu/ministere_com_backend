import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'numberClient',
    description: 'number of User without prefix',
  })
  readonly numberClient: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'fullName',
    description: 'Full Name of User',
  })
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    description: 'password of User',
  })
  readonly password: string;
}

export class ResponseAuthenticationUser {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  numberClient: string;

  @ApiProperty()
  id: number;
}
