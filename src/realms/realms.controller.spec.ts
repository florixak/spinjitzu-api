import { Test, TestingModule } from '@nestjs/testing';
import { RealmsController } from './realms.controller';
import { RealmsService } from './realms.service';

describe('RealmsController', () => {
  let controller: RealmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealmsController],
      providers: [RealmsService],
    }).compile();

    controller = module.get<RealmsController>(RealmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
