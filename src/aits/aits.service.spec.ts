import { Test, TestingModule } from '@nestjs/testing';
import { AitsService } from './aits.service';

describe('AitsService', () => {
  let service: AitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AitsService],
    }).compile();

    service = module.get<AitsService>(AitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
