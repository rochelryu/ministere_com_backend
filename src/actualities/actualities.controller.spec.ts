import { Test, TestingModule } from '@nestjs/testing';
import { ActualitiesController } from './actualities.controller';
import { ActualitiesService } from './actualities.service';

describe('ActualitiesController', () => {
  let controller: ActualitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActualitiesController],
      providers: [ActualitiesService],
    }).compile();

    controller = module.get<ActualitiesController>(ActualitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
