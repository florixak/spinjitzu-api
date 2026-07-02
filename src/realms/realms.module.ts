import { Module } from '@nestjs/common';
import { RealmsService } from './realms.service';
import { RealmsController } from './realms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RealmsController],
  providers: [RealmsService],
})
export class RealmsModule {}
