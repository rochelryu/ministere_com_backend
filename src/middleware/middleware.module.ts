import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { VerifyClientMiddleware } from './verify-client/verify-client.middleware';
import { ALL_ENTITY } from 'src/common/constant';

@Module({
  imports: ALL_ENTITY,
})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyClientMiddleware).forRoutes(
      // For Hobie
      { path: 'hobbies/all/:id', method: RequestMethod.GET },

      // For actualities
      { path: 'actualities/all/:id', method: RequestMethod.GET },
      {
        path: 'actualities/viewMore/:id/:actualityId',
        method: RequestMethod.GET,
      },
      {
        path: 'actualities/getByHobby/:id/:hobbyId',
        method: RequestMethod.GET,
      },
      {
        path: 'actualities/getByHobby/:id/:hobbyId',
        method: RequestMethod.GET,
      },
      {
        path: 'actualities/single/:id/:idActuality',
        method: RequestMethod.GET,
      },
      // For User
      { path: '/Users/getHobbies/:id', method: RequestMethod.GET },
      { path: '/Users/updatePass', method: RequestMethod.POST },
      { path: '/Users/updateHobbies', method: RequestMethod.POST },
    );
  }
}
