import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseProvider } from 'src/common/interfaces';
import { coreEncode } from 'crypto-core';
import { generateRecovery } from 'src/common/functions';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async verifyUser(signinUserDto: SigninUserDto): Promise<ResponseProvider> {
    const pass = await coreEncode(
      signinUserDto.password.trim(),
      Number(process.env.CRYPTO_DIGEST),
    );
    return new Promise(async (next) => {
      await this.usersRepository
        .findOne({
          where: {
            numberClient: signinUserDto.numberClient.trim(),
            password: pass,
          },
        })
        .then(async (result) => {
          if (result) {
            result.updated_at = new Date();
            await result.save();
            next({
              etat: true,
              result: {
                numberClient: result.numberClient,
                fullName: result.fullName,
                id: result.id,
              },
            });
          } else {
            next({ etat: false, error: new Error('Verifié vos coordonnés') });
          }
        })
        .catch((error) => next({ etat: false, error }));
    });
  }

  async createUser(user: CreateUserDto): Promise<ResponseProvider> {
    return new Promise(async (next) => {
      await this.usersRepository
        .findOne({
          where: [{ numberClient: user.numberClient.trim() }],
        })
        .then(async (res) => {
          if (res) {
            next({
              etat: false,
              error: Error('Ce numéro est déjà associé à un compte'),
            });
          } else {
            const { password, ...rest } = user;
            const recoveryNewUser = generateRecovery();
            const pass = await coreEncode(
              password.trim(),
              Number(process.env.CRYPTO_DIGEST),
            );
            await this.usersRepository
              .save({
                numberClient: rest.numberClient.trim(),
                fullName: rest.fullName.trim(),
                recovery: recoveryNewUser,
                password: pass,
              })
              .then((result) => {
                next({ etat: true, result });
              })
              .catch((error) => {
                next({ etat: false, error });
              });
          }
        })
        .catch((error) => next({ etat: false, error }));
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
