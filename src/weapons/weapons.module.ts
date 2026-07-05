import { Module } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { WeaponsController } from './weapons.controller';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [WeaponsController],
  providers: [WeaponsService],
})
export class WeaponsModule {}
