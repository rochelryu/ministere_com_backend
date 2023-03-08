import { ApiProperty } from '@nestjs/swagger';

export class ResponseProviderClass {
  @ApiProperty({
    name: 'etat',
    description:
      'It is of type boolean, To tell if the request was made successfully or not.',
  })
  etat: boolean;

  @ApiProperty({
    name: 'result',
    description:
      'It is of type object and can return any value as object content',
  })
  result: string;

  @ApiProperty({
    name: 'error',
    description:
      'It is of type string and is returned only in case of failure of the instruction, it will always say what was the Problem',
  })
  error: string;
}
