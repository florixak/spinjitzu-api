import { Controller, Get } from '@nestjs/common';
import { PublicRead } from 'src/common/decorators/public-read.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicRead()
  getHello(): string {
    return this.appService.getHello();
  }
}
