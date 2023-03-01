import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HobbiesModule } from './hobbies/hobbies.module';
import { ActualitiesModule } from './actualities/actualities.module';
import { ALL_ENTITY } from './common/constant';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    }),
    ...ALL_ENTITY,
    UsersModule,
    HobbiesModule,
    ActualitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
