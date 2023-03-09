import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSchemeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    description: 'identifiant of User',
  })
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'recovery',
    description: 'credentials of User',
  })
  readonly recovery: number;
}
