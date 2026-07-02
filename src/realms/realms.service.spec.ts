import { Test, TestingModule } from '@nestjs/testing';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { RealmsService } from './realms.service';

describe('RealmsService', () => {
  let service: RealmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RealmsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RealmsService>(RealmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
