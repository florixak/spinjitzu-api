import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ElementsController } from './elements.controller';
import { ElementsService } from './elements.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ElementsController],
  providers: [ElementsService],
})
export class ElementsModule {}
