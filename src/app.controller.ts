import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicRead } from './common/decorators/public-read.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicRead()
  getHello(): string {
    return this.appService.getHello();
  }
}
