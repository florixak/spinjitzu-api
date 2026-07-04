import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
