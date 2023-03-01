import { Test, TestingModule } from '@nestjs/testing';
import { ActualitiesService } from './actualities.service';

describe('ActualitiesService', () => {
  let service: ActualitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActualitiesService],
    }).compile();

    service = module.get<ActualitiesService>(ActualitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
