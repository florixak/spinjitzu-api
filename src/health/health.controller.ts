import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check the health of the database' })
  @HealthCheck()
  @SkipThrottle()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  check() {
    return this.healthService.checkDatabase();
  }
}
