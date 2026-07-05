import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ElementsController } from './elements.controller';
import { ElementsService } from './elements.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ElementsController],
  providers: [ElementsService],
})
export class ElementsModule {}
