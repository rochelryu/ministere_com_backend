import { PartialType } from '@nestjs/mapped-types';
import { CreateActualityDto } from './create-actuality.dto';

export class UpdateActualityDto extends PartialType(CreateActualityDto) {}
