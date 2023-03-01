import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
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
    name: 'password',
    description: 'password of User',
  })
  readonly password: string;
}
