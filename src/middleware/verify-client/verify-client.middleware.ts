import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  Logger,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyClientMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  private logger: Logger = new Logger('VerifyClientMiddleware');
  async use(@Request() req, @Res() res: Response, next: () => void) {
    const id = req.params.id || req.body.id;
    const recovery = req.body.recovery || req.query.recovery;
    const user = await this.usersRepository.findOne({
      where: { id: parseInt(id, 10), recovery: parseInt(recovery, 10) },
    });
    if (!user) {
      throw new HttpException('Not Found credentials', HttpStatus.NOT_FOUND);
    }
    next();
  }
}

// } else if (req.headers['.user-agent'] !== 'Dart/2.6 (dart:io)') {
//   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
// } ;
