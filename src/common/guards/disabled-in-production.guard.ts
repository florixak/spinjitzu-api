import { CanActivate, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class DisabledInProductionGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'Write operations are disabled in the production environment.',
      );
    }
    return true;
  }
}
