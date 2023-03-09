import { PartialType } from '@nestjs/mapped-types';
import { UserSchemeDto } from './user-scheme';

export class UpdateUserDto extends PartialType(UserSchemeDto) {}
