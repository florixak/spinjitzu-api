import { Test, TestingModule } from '@nestjs/testing';
import { DATABASE_CONNECTION } from 'src/database/database.module';
import { ElementsService } from './elements.service';

describe('ElementsService', () => {
  let service: ElementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElementsService,
        {
          provide: DATABASE_CONNECTION,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ElementsService>(ElementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
