import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const mockUser: JwtPayload = {
    sub: 1,
    email: 'test@test.com',
    role: Role.USER,
  };

  const createMockContext = (
    userPayload: JwtPayload | undefined,
  ): Partial<ExecutionContext> => ({
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ user: userPayload }),
    }),
  });

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    guard = new RolesGuard(reflector);
  });

  it('allows access when no required roles are defined', () => {
    const getAllAndOverride = jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(undefined);
    const mockContext = createMockContext(undefined);

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
    expect(getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      mockContext.getHandler?.(),
      mockContext.getClass?.(),
    ]);
  });

  it('allows access when required roles array is empty', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);
    const mockContext = createMockContext(mockUser);

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
  });

  it('denies access when request user is missing', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    const mockContext = createMockContext(undefined);

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(false);
  });

  it('denies access when the user does not have a required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    const mockContext = createMockContext(mockUser);

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(false);
  });

  it('allows access when the user has one of the required roles', () => {
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue([Role.ADMIN, Role.USER]);
    const mockContext = createMockContext({ ...mockUser, role: Role.ADMIN });

    const result = guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
  });
});
