import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

export const AdminWrite = () =>
  applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.ADMIN),
    Throttle({ write: { limit: 20, ttl: 60000 } }),
  );
