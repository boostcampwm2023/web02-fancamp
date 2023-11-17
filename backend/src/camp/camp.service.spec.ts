import { Test, TestingModule } from '@nestjs/testing';
import { CampService } from './camp.service';

describe('CampService', () => {
  let service: CampService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampService],
    }).compile();

    service = module.get<CampService>(CampService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
