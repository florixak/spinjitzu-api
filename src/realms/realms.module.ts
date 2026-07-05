import { Module } from '@nestjs/common';
import { RealmsService } from './realms.service';
import { RealmsController } from './realms.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RealmsController],
  providers: [RealmsService],
})
export class RealmsModule {}
